// РџС–РґРєР»СЋС‡РµРЅРЅСЏ С„СѓРЅРєС†С–РѕРЅР°Р»Сѓ "Р§РµСЂС‚РѕРіРё Р¤СЂС–Р»Р°РЅСЃРµСЂР°"
import { gotoBlock, FLS } from "@js/common/functions.js";
// РџС–РґРєР»СЋС‡РµРЅРЅСЏ С„СѓРЅРєС†С–РѕРЅР°Р»Сѓ РјРѕРґСѓР»СЏ С„РѕСЂРј
import { formValidate } from "../_functions.js";

import './form.scss'

function formInit() {
	// Р’С–РґРїСЂР°РІР»РµРЅРЅСЏ С„РѕСЂРј
	function formSubmit() {
		const forms = document.forms;
		if (forms.length) {
			for (const form of forms) {
				// РџСЂРёР±РёСЂР°С”РјРѕ РІР±СѓРґРѕРІР°РЅСѓ РІР°Р»С–РґР°С†С–СЋ
				!form.hasAttribute('data-fls-form-novalidate') ? form.setAttribute('novalidate', true) : null
				// РџРѕРґС–СЏ РІС–РґРїСЂР°РІРєРё
				form.addEventListener('submit', function (e) {
					const form = e.target;
					formSubmitAction(form, e);
				});
				// РџРѕРґС–СЏ РѕС‡РёСЃС‚РєРё
				form.addEventListener('reset', function (e) {
					const form = e.target;
					formValidate.formClean(form);
				});
			}
		}
		async function formSubmitAction(form, e) {
			const error = formValidate.getErrors(form)
			if (error === 0) {
				if (form.dataset.flsForm === 'ajax') { // РЇРєС‰Рѕ СЂРµР¶РёРј ajax
					e.preventDefault();
					const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
					const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
					const formData = new FormData(form);
					form.classList.add('--sending');
					const response = await fetch(formAction, {
						method: formMethod,
						body: formData
					});
					if (response.ok) {
						const responseText = await response.text();
						let responseResult;
						try {
							const safeText = responseText.replace(/^\uFEFF/, '').trim();
							responseResult = JSON.parse(safeText);
						} catch (parseError) {
							responseResult = { message: 'Сервер вернул некорректный JSON ответ.' };
							console.error(parseError, responseText);
						}
						form.classList.remove('--sending')
						formSent(form, responseResult)
					} else {
						FLS("_FLS_FORM_AJAX_ERR")
						form.classList.remove('--sending')
					}
				} else if (form.dataset.flsForm === 'dev') {	// РЇРєС‰Рѕ СЂРµР¶РёРј СЂРѕР·СЂРѕР±РєРё
					e.preventDefault()
					formSent(form)
				}
			} else {
				e.preventDefault();
				if (form.querySelector('.--form-error') && form.hasAttribute('data-fls-form-gotoerr')) {
					const formGoToErrorClass = form.dataset.flsFormGotoerr ? form.dataset.flsFormGotoerr : '.--form-error';
					gotoBlock(formGoToErrorClass);
				}
			}
		}
		// Р”С–С— РїС–СЃР»СЏ РЅР°РґСЃРёР»Р°РЅРЅСЏ С„РѕСЂРјРё
		function formSent(form, responseResult = ``) {
			// РЎС‚РІРѕСЂСЋС”РјРѕ РїРѕРґС–СЋ РІС–РґРїСЂР°РІР»РµРЅРЅСЏ С„РѕСЂРјРё
			document.dispatchEvent(new CustomEvent("formSent", {
				detail: {
					form: form
				}
			}));
			// РџРѕРєР°Р·СѓС”РјРѕ РїРѕРїР°Рї, СЏРєС‰Рѕ РїС–РґРєР»СЋС‡РµРЅРѕ РјРѕРґСѓР»СЊ РїРѕРїР°РїС–РІ 
			// С‚Р° РґР»СЏ С„РѕСЂРјРё РІРєР°Р·Р°РЅРѕ РЅР°Р»Р°С€С‚СѓРІР°РЅРЅСЏ
			setTimeout(() => {
				if (window.flsPopup) {
					const popup = form.dataset.flsFormPopup;
					popup ? window.flsPopup.open(popup) : null;
				}
			}, 0);
			// РћС‡РёС‰СѓС”РјРѕ С„РѕСЂРјСѓ
			formValidate.formClean(form);
			// РџРѕРІС–РґРѕРјР»СЏС”РјРѕ РґРѕ РєРѕРЅСЃРѕР»С–
			FLS(`_FLS_FORM_SEND`);
		}
	}
	// Р РѕР±РѕС‚Р° С–Р· РїРѕР»СЏРјРё С„РѕСЂРјРё.
	function formFieldsInit() {
		document.body.addEventListener("focusin", function (e) {
			const targetElement = e.target;
			if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
				if (!targetElement.hasAttribute('data-fls-form-nofocus')) {
					targetElement.classList.add('--form-focus');
					targetElement.parentElement.classList.add('--form-focus');
				}
				targetElement.hasAttribute('data-fls-form-validatenow') ? formValidate.removeError(targetElement) : null;
			}
		});
		document.body.addEventListener("focusout", function (e) {
			const targetElement = e.target;
			if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
				if (!targetElement.hasAttribute('data-fls-form-nofocus')) {
					targetElement.classList.remove('--form-focus');
					targetElement.parentElement.classList.remove('--form-focus');
				}
				// РњРёС‚С‚С”РІР° РІР°Р»С–РґР°С†С–СЏ
				targetElement.hasAttribute('data-fls-form-validatenow') ? formValidate.validateInput(targetElement) : null;
			}
		});
	}
	formSubmit()
	formFieldsInit()
}
document.querySelector('[data-fls-form]') ?
	window.addEventListener('load', formInit) : null
