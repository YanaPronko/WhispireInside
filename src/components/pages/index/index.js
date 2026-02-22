
import './index.scss'
import Inputmask from 'inputmask'
import '@components/forms/select/select.js'

const initHeroParallax = async () => {
	const hasHeroParallax = document.querySelector('[data-fls-parallax-parent]');
	if (!hasHeroParallax) return;

	const enableParallax = window.matchMedia('(min-width: 992px)').matches &&
		window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

	if (!enableParallax) {
		document.querySelectorAll('[data-fls-parallax-parent],[data-fls-parallax]').forEach((el) => {
			el.removeAttribute('data-fls-parallax-parent');
			el.removeAttribute('data-fls-parallax');
		});
		return;
	}

	await import('@components/effects/parallax/parallax.js');
};

const initHeroScrollArrow = () => {
	const hero = document.querySelector('.hero');
	const arrow = document.querySelector('[data-hero-scroll]');
	const content = document.querySelector('.hero__content');
	if (!hero || !arrow) return;

	let ticking = false;
	const update = () => {
		const scrollY = window.scrollY || 0;
		const limit = Math.max(hero.offsetHeight * 0.5, 240);
		const progress = Math.min(scrollY / limit, 1);
		const offset = progress * 16;
		arrow.style.transform = `translateX(-50%) translateY(${offset}px)`;
		arrow.style.opacity = `${1 - progress}`;

		if (content) {
			const contentProgress = Math.min(scrollY / Math.max(hero.offsetHeight * 0.45, 260), 1);
			content.style.opacity = `${1 - contentProgress}`;
			content.style.transform = `translateY(${contentProgress * 28}px)`;
		}
		ticking = false;
	};

	const onScroll = () => {
		if (ticking) return;
		ticking = true;
		window.requestAnimationFrame(update);
	};

	update();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
};

const initPhoneMask = () => {
	const phoneCode = document.querySelector('select[name="phone_code"]');
	const phoneInput = document.querySelector('#contact-phone');
	if (!phoneCode || !phoneInput) return;

	const masksByCode = {
		'+7': '+7 (999) 999-99-99',
		'+380': '+380 (99) 999-99-99',
		'+375': '+375 (99) 999-99-99',
		'+1': '+1 (999) 999-9999',
		'+44': '+44 99 9999 9999',
		'+49': '+49 999 99999999',
		'+33': '+33 9 99 99 99 99',
		'+34': '+34 999 99 99 99',
		'+39': '+39 999 999 9999',
		'+48': '+48 999 999 999'
	};

	const applyMask = (code) => {
		const mask = masksByCode[code] || masksByCode['+7'];
		const inputMask = new Inputmask({ mask, showMaskOnHover: false });
		inputMask.mask(phoneInput);
		phoneInput.value = '';
		phoneInput.placeholder = mask.replace(/9/g, '_');
		phoneInput.dataset.flsInputMask = mask;
	};

	applyMask(phoneCode.value);
	const syncMask = () => applyMask(phoneCode.value);
	phoneCode.addEventListener('change', syncMask);
	document.addEventListener('selectCallback', (event) => {
		const changedSelect = event?.detail?.select;
		if (!changedSelect || changedSelect.name !== 'phone_code') return;
		syncMask();
	});
};

const ensureContactSelects = () => {
	const rebuildIfNeeded = (fieldName) => {
		const originalSelect = document.querySelector(`select[name="${fieldName}"]`);
		if (!originalSelect || !window.flsSelect) return;
		const builtSelect = originalSelect.parentElement?.querySelector('.select__option');
		if (!builtSelect && originalSelect.options.length > 0) {
			window.flsSelect.selectBuild(originalSelect);
		}
	};

	rebuildIfNeeded('service_type');
	rebuildIfNeeded('phone_code');
	setTimeout(() => {
		rebuildIfNeeded('service_type');
		rebuildIfNeeded('phone_code');
	}, 220);
};

const initFaqAccordion = () => {
	const faqItems = Array.from(document.querySelectorAll('.faq-item'));
	if (!faqItems.length) return;

	const closeItem = (item) => {
		const trigger = item.querySelector('[data-faq-trigger]');
		const body = item.querySelector('.faq-item__body');
		if (!trigger || !body || !item.classList.contains('--open')) return;

		body.style.height = `${body.scrollHeight}px`;
		requestAnimationFrame(() => {
			item.classList.remove('--open');
			trigger.setAttribute('aria-expanded', 'false');
			body.style.height = '0px';
		});
	};

	const openItem = (item) => {
		const trigger = item.querySelector('[data-faq-trigger]');
		const body = item.querySelector('.faq-item__body');
		if (!trigger || !body) return;

		body.hidden = false;
		body.style.height = '0px';
		requestAnimationFrame(() => {
			item.classList.add('--open');
			trigger.setAttribute('aria-expanded', 'true');
			body.style.height = `${body.scrollHeight}px`;
		});
	};

	faqItems.forEach((item) => {
		const trigger = item.querySelector('[data-faq-trigger]');
		const body = item.querySelector('.faq-item__body');
		if (!trigger || !body) return;

		body.hidden = true;
		body.style.height = '0px';

		body.addEventListener('transitionend', (event) => {
			if (event.propertyName !== 'height') return;
			if (item.classList.contains('--open')) {
				body.style.height = 'auto';
				return;
			}
			body.hidden = true;
		});

		trigger.addEventListener('click', () => {
			const isOpen = item.classList.contains('--open');
			faqItems.forEach((faqItem) => {
				if (faqItem !== item) closeItem(faqItem);
			});
			if (isOpen) {
				closeItem(item);
			} else {
				openItem(item);
			}
		});
	});
};

window.addEventListener('load', initHeroScrollArrow);
window.addEventListener('load', initHeroParallax);
window.addEventListener('load', initPhoneMask);
window.addEventListener('load', ensureContactSelects);
window.addEventListener('load', initFaqAccordion);
