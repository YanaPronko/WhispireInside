const COOKIE_KEY = 'fls-cookie-consent-v1';
const CONSENT_ACCEPTED = 'accepted';
const CONSENT_DECLINED = 'declined';

const hideBanner = (banner) => {
	banner.classList.remove('--visible');
	setTimeout(() => banner.remove(), 260);
};

const saveConsent = (status, banner) => {
	try {
		localStorage.setItem(COOKIE_KEY, status);
	} catch (error) {
		console.warn(error);
	}
	hideBanner(banner);
};

const initCookieConsent = () => {
	const banner = document.querySelector('[data-cookie-consent]');
	if (!banner) return;

	try {
		const storedConsent = localStorage.getItem(COOKIE_KEY);
		if (storedConsent === CONSENT_ACCEPTED || storedConsent === CONSENT_DECLINED) {
			banner.remove();
			return;
		}
	} catch (error) {
		console.warn(error);
	}

	banner.hidden = false;
	requestAnimationFrame(() => banner.classList.add('--visible'));

	const acceptButton = banner.querySelector('[data-cookie-accept]');
	const declineButton = banner.querySelector('[data-cookie-decline]');

	if (acceptButton) {
		acceptButton.addEventListener('click', () => saveConsent(CONSENT_ACCEPTED, banner));
	}

	if (declineButton) {
		declineButton.addEventListener('click', () => saveConsent(CONSENT_DECLINED, banner));
	}
};

window.addEventListener('load', initCookieConsent);
