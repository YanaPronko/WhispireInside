
import './index.scss'

const initHeroScrollArrow = () => {
	const hero = document.querySelector('.hero');
	const arrow = document.querySelector('[data-hero-scroll]');
	const content = document.querySelector('.hero__content');
	if (!hero || !arrow) return;

	const onScroll = () => {
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
	};

	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });
};

window.addEventListener('load', initHeroScrollArrow);
