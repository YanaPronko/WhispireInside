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
					const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
					const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
					const formData = new FormData(form);
					form.classList.add('--sending');
					try {
						const response = await fetch(formAction, {
							method: formMethod,
							body: formData
						});

						let responseResult = { success: false, message: 'Что-то пошло не так! Свяжитесь, пожалуйста, со мной посредством соцсетей.' };
						if (response.ok) {
							const responseText = await response.text();
							try {
								const safeText = responseText.replace(/^\uFEFF/, '').trim();
								responseResult = JSON.parse(safeText);
							} catch (parseError) {
								responseResult = { success: false, message: 'Сервер вернул некорректный JSON ответ.' };
								console.error(parseError, responseText);
							}
						}

						form.classList.remove('--sending')
						if (response.ok && responseResult?.success !== false) {
							formSent(form, responseResult)
						} else {
							formFailed(form, responseResult)
						}
					} catch (fetchError) {
						FLS("_FLS_FORM_AJAX_ERR")
						form.classList.remove('--sending')
						console.error(fetchError);
						formFailed(form, { success: false, message: 'Ошибка сети.' })
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
