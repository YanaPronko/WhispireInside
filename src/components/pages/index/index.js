
import './index.scss'

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

window.addEventListener('load', initHeroScrollArrow);
window.addEventListener('load', initHeroParallax);
