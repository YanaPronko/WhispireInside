// Підключення функціоналу "Чортоги Фрілансера"
import { FLS } from "@js/common/functions.js"

// Валідація форм
export let formValidate = {
	getErrors(form) {
		FLS(`_FLS_FORM_VALIDATE`);
		let error = 0;
		let formRequiredItems = form.querySelectorAll('[required]');
		if (formRequiredItems.length) {
			formRequiredItems.forEach(formRequiredItem => {
				if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
					error += this.validateInput(formRequiredItem);
				}
			});
		}
		return error;
	},
	validateInput(formRequiredItem) {
		let error = 0;
		if (formRequiredItem.type === "email") {
			formRequiredItem.value = formRequiredItem.value.replace(" ", "");
			if (this.emailTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				this.removeSuccess(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
				this.addSuccess(formRequiredItem);
			}
		} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
			this.addError(formRequiredItem);
			this.removeSuccess(formRequiredItem);
			error++;
		} else {
			if (!formRequiredItem.value.trim()) {
				this.addError(formRequiredItem);
				this.removeSuccess(formRequiredItem);
				error++;
			} else if (formRequiredItem.dataset.flsFormRule === 'name' && this.nameTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				this.removeSuccess(formRequiredItem);
				error++;
			} else if (formRequiredItem.dataset.flsFormRule === 'phone' && this.phoneTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				this.removeSuccess(formRequiredItem);
				error++;
			} else if (formRequiredItem.dataset.flsFormRule === 'future-date' && this.futureDateTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				this.removeSuccess(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
				this.addSuccess(formRequiredItem);
			}
		}
		return error;
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add('--form-error');
		formRequiredItem.parentElement.classList.add('--form-error');
		let inputError = formRequiredItem.parentElement.querySelector('[data-fls-form-error]');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (formRequiredItem.dataset.flsFormErrtext) {
			formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div data-fls-form-error>${formRequiredItem.dataset.flsFormErrtext}</div>`);
		}
	},
	removeError(formRequiredItem) {
		formRequiredItem.classList.remove('--form-error');
		formRequiredItem.parentElement.classList.remove('--form-error');
		if (formRequiredItem.parentElement.querySelector('[data-fls-form-error]')) {
			formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('[data-fls-form-error]'));
		}
	},
	addSuccess(formRequiredItem) {
		formRequiredItem.classList.add('--form-success');
		formRequiredItem.parentElement.classList.add('--form-success');
	},
	removeSuccess(formRequiredItem) {
		formRequiredItem.classList.remove('--form-success')
		formRequiredItem.parentElement.classList.remove('--form-success')
	},
	removeFocus(formRequiredItem) {
		formRequiredItem.classList.remove('--form-focus')
		formRequiredItem.parentElement.classList.remove('--form-focus')
	},
	formClean(form) {
		form.reset();
		setTimeout(() => {
			let inputs = form.querySelectorAll('input,textarea')
			for (let index = 0; index < inputs.length; index++) {
				const el = inputs[index];
				formValidate.removeFocus(el)
				formValidate.removeSuccess(el)
				formValidate.removeError(el)
			}
			let checkboxes = form.querySelectorAll('input[type="checkbox"]')
			if (checkboxes.length) {
				checkboxes.forEach(checkbox => {
					checkbox.checked = false
				})
			}
			if (window['flsSelect']) {
				let selects = form.querySelectorAll('select[data-fls-select]')
				if (selects.length) {
					selects.forEach(select => {
						window['flsSelect'].selectBuild(select)
					})
				}
			}
		}, 0)
	},
	emailTest(formRequiredItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
	},
	nameTest(formRequiredItem) {
		return !/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]+$/u.test(formRequiredItem.value.trim());
	},
	phoneTest(formRequiredItem) {
		const value = formRequiredItem.value.trim();
		if (!/^[\d\s()+\-]+$/.test(value)) return true;
		const digits = value.replace(/\D+/g, '');
		return digits.length < 7 || digits.length > 15;
	},
	futureDateTest(formRequiredItem) {
		const dateValue = this.parseDateString(formRequiredItem.value);
		if (!dateValue) return true;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return dateValue < today;
	},
	parseDateString(value) {
		const source = (value || '').trim();
		if (!source) return null;

		const separatorMatch = source.match(/[./-]/);
		if (separatorMatch) {
			const separator = separatorMatch[0];
			const parts = source.split(separator).map((part) => part.trim()).filter(Boolean);
			if (parts.length === 3) {
				let day;
				let month;
				let year;

				if (parts[0].length === 4) {
					year = Number(parts[0]);
					month = Number(parts[1]);
					day = Number(parts[2]);
				} else if (parts[2].length === 4) {
					year = Number(parts[2]);
					if (separator === '/') {
						month = Number(parts[0]);
						day = Number(parts[1]);
					} else {
						day = Number(parts[0]);
						month = Number(parts[1]);
					}
				}

				if (
					Number.isInteger(day) && Number.isInteger(month) && Number.isInteger(year) &&
					day > 0 && month > 0 && month <= 12
				) {
					const parsed = new Date(year, month - 1, day);
					if (
						parsed.getFullYear() === year &&
						parsed.getMonth() === month - 1 &&
						parsed.getDate() === day
					) {
						parsed.setHours(0, 0, 0, 0);
						return parsed;
					}
				}
			}
		}

		const fallback = new Date(source);
		if (Number.isNaN(fallback.getTime())) return null;
		fallback.setHours(0, 0, 0, 0);
		return fallback;
	}
}
