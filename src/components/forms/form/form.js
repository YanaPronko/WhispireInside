// Підключення функціоналу "Чортоги Фрілансера"
import { gotoBlock, FLS } from "@js/common/functions.js";
// Підключення функціоналу модуля форм
import { formValidate } from "../_functions.js";

import './form.scss'

function formInit() {
	const openStatusPopup = (form, status = 'success') => {
		if (!window.flsPopup) return;
		const popupSelector = status === 'success'
			? (form.dataset.flsFormPopupSuccess || 'form-success')
			: (form.dataset.flsFormPopupError || 'form-error');
		window.flsPopup.open(popupSelector);
	};
	const isWeb3FormsEndpoint = (url) => /api\.web3forms\.com\/submit\/?$/i.test((url || '').trim());

	// Відправлення форм
	function formSubmit() {
		const forms = document.forms;
		if (forms.length) {
			for (const form of forms) {
				// Прибираємо вбудовану валідацію
				!form.hasAttribute('data-fls-form-novalidate') ? form.setAttribute('novalidate', true) : null
				// Подія відправки
				form.addEventListener('submit', function (e) {
					const form = e.target;
					formSubmitAction(form, e);
				});
				// Подія очистки
				form.addEventListener('reset', function (e) {
					const form = e.target;
					formValidate.formClean(form);
				});
			}
		}
		async function formSubmitAction(form, e) {
			const error = formValidate.getErrors(form)
			if (error === 0) {
				if (form.dataset.flsForm === 'ajax') { // Якщо режим ajax
					e.preventDefault();
					const envFormEndpoint = (import.meta.env.VITE_FORM_ENDPOINT || '').trim();
					const formAction = envFormEndpoint || (form.getAttribute('action') ? form.getAttribute('action').trim() : '#');
					const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
					const formData = new FormData(form);
					const web3FormsKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim();
					if (isWeb3FormsEndpoint(formAction)) {
						if (web3FormsKey) {
							formData.set('access_key', web3FormsKey);
						} else if (!formData.get('access_key')) {
							formFailed(form, { success: false, message: 'Не указан ключ Web3Forms (VITE_WEB3FORMS_ACCESS_KEY).' });
							return;
						}
					}
					form.classList.add('--sending');
					try {
						const response = await fetch(formAction, {
							method: formMethod,
							headers: {
								'Accept': 'application/json'
							},
							body: formData
						});

						let responseResult = { success: false, message: 'Что-то пошло не так! Свяжитесь, пожалуйста, со мной посредством соцсетей.' };
						const responseText = await response.text();
						const safeText = responseText.replace(/^\uFEFF/, '').trim();
						if (!safeText) {
							if (response.ok) responseResult = { success: true };
						} else {
							try {
								responseResult = JSON.parse(safeText);
							} catch (parseError) {
								// External form backends can return non-JSON even on success.
								if (response.ok) {
									responseResult = { success: true };
								}
								console.warn('Non-JSON response from form endpoint.', parseError, responseText);
							}
						}
						if (!response.ok && responseResult?.errors?.[0]?.message) {
							responseResult.message = responseResult.errors[0].message;
						}

						if (response.ok && responseResult?.success !== false) {
							formSent(form, responseResult)
						} else {
							formFailed(form, responseResult)
						}
					} catch (fetchError) {
						FLS("_FLS_FORM_AJAX_ERR")
						console.error(fetchError);
						formFailed(form, { success: false, message: 'Ошибка сети.' })
					} finally {
						form.classList.remove('--sending')
					}
				} else if (form.dataset.flsForm === 'dev') { // Якщо режим розробки
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
		// Дії після надсилання форми
		function formSent(form, responseResult = ``) {
			// Створюємо подію відправлення форми
			document.dispatchEvent(new CustomEvent("formSent", {
				detail: {
					form: form,
					responseResult: responseResult
				}
			}));
			setTimeout(() => openStatusPopup(form, 'success'), 0);
			// Очищуємо форму
			formValidate.formClean(form);
			// Повідомляємо до консолі
			FLS(`_FLS_FORM_SEND`);
		}
		// Дії при помилці відправки
		function formFailed(form, responseResult = ``) {
			document.dispatchEvent(new CustomEvent("formError", {
				detail: {
					form: form,
					responseResult: responseResult
				}
			}));
			setTimeout(() => openStatusPopup(form, 'error'), 0);
			if (responseResult?.message) {
				console.warn(responseResult.message);
			}
		}
	}
	// Робота із полями форми.
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
				// Миттєва валідація
				targetElement.hasAttribute('data-fls-form-validatenow') ? formValidate.validateInput(targetElement) : null;
			}
		});
	}
	formSubmit()
	formFieldsInit()
}
document.querySelector('[data-fls-form]') ?
	window.addEventListener('load', formInit) : null
