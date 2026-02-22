// Підключення модуля
import datepicker from 'js-datepicker';
import { formValidate } from "../_functions.js";

import langs from "./_lang.json"
import './datepicker.scss'

if (document.querySelector('[data-fls-datepicker]')) {
	const LANG = 'ru' // ua, en
	const datePicker = datepicker('[data-fls-datepicker]', {
		customDays: langs[LANG].week,
		customMonths: langs[LANG].month,
		overlayButton: langs[LANG].button,
		overlayPlaceholder: langs[LANG].year,
		startDay: 1,
		minDate: new Date(),
		formatter: (input, date, instance) => {
			const value = date.toLocaleDateString()
			input.value = value
		},
		onSelect: function (instance, date) {
			const inputElement = instance?.el || document.querySelector('[data-fls-datepicker]');
			if (!inputElement) return;
			// Якщо дата обрана коректно, знімаємо повідомлення про помилку
			formValidate.validateInput(inputElement);
		}
	});
	window.flsDatepicker = datePicker;
}
