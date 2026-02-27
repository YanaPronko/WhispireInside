
import './index.scss'
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
	setTimeout(() => {
		rebuildIfNeeded('service_type');
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
window.addEventListener('load', ensureContactSelects);
window.addEventListener('load', initFaqAccordion);
