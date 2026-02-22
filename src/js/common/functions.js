// FLS (Full Logging System)
export function FLS(text, vars = '') {
	if (flsLogging) {
		if (flsLang[text]) {
			if (Array.isArray(vars)) {
				let i = 0
				text = flsLang[text].replace(/@@/g, () => vars[i++])
			} else {
				text = text.replace(text, flsLang[text].replace('@@', vars))
			}
		}
		setTimeout(() => {
			if (text.startsWith('(!)')) {
				console.warn(text.replace('(!)', ''))
			} else if (text.startsWith('(!!)')) {
				console.error(text.replace('(!!)', ''))
			} else {
				console.log(text)
			}
		}, 0);
	}
}
/* РџРµСЂРµРІС–СЂРєР° РјРѕР±С–Р»СЊРЅРѕРіРѕ Р±СЂР°СѓР·РµСЂР° */
export const isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Р”РѕРґР°РІР°РЅРЅСЏ РєР»Р°СЃСѓ touch РґР»СЏ HTML, СЏРєС‰Рѕ Р±СЂР°СѓР·РµСЂ РјРѕР±С–Р»СЊРЅРёР№ */
export function addTouchAttr() {
	// Р”РѕРґР°РІР°РЅРЅСЏ data-fls-touch РґР»СЏ HTML, СЏРєС‰Рѕ Р±СЂР°СѓР·РµСЂ РјРѕР±С–Р»СЊРЅРёР№
	if (isMobile.any()) document.documentElement.setAttribute('data-fls-touch', '')
}
// Р”РѕРґР°РІР°РЅРЅСЏ loaded РґР»СЏ HTML РїС–СЃР»СЏ РїРѕРІРЅРѕРіРѕ Р·Р°РІР°РЅС‚Р°Р¶РµРЅРЅСЏ СЃС‚РѕСЂС–РЅРєРё
export function addLoadedAttr() {
	if (!document.documentElement.hasAttribute('data-fls-preloader-loading')) {
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.documentElement.setAttribute('data-fls-loaded', '')
			}, 0);
		});
	}
}
// РћС‚СЂРёРјР°РЅРЅСЏ С…РµС€Сѓ РЅР° Р°РґСЂРµСЃС– СЃР°Р№С‚Сѓ
export function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); }
}
// Р’РєР°Р·С–РІРєР° С…РµС€Р° РЅР° Р°РґСЂРµСЃСѓ СЃР°Р№С‚Сѓ
export function setHash(hash) {
	hash = hash ? `#${hash}` : window.location.href.split('#')[0];
	history.pushState('', '', hash);
}
// Р”РѕРїРѕРјС–Р¶РЅС– РјРѕРґСѓР»С– РїР»Р°РІРЅРѕРіРѕ СЂРѕР·РєСЂРёС‚С‚СЏ С‚Р° Р·Р°РєСЂРёС‚С‚СЏ РѕР±'С”РєС‚Р°
export let slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('--slide')) {
		target.classList.add('--slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('--slide');
			// РЎС‚РІРѕСЂСЋС”РјРѕ РїРѕРґС–СЋ 
			document.dispatchEvent(new CustomEvent("slideUpDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
export let slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('--slide')) {
		target.classList.add('--slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('--slide');
			// РЎС‚РІРѕСЂСЋС”РјРѕ РїРѕРґС–СЋ
			document.dispatchEvent(new CustomEvent("slideDownDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
export let slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return slideDown(target, duration);
	} else {
		return slideUp(target, duration);
	}
}
// Р”РѕРїРѕРјС–Р¶РЅС– РјРѕРґСѓР»С– Р±Р»РѕРєСѓРІР°РЅРЅСЏ РїСЂРѕРєСЂСѓС‡СѓРІР°РЅРЅСЏ С‚Р° СЃС‚СЂРёР±РєР°
export let bodyLockStatus = true
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.hasAttribute("data-fls-scrolllock")) {
		bodyUnlock(delay)
	} else {
		bodyLock(delay)
	}
}
export let bodyUnlock = (delay = 500) => {
	if (bodyLockStatus) {
		const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
		setTimeout(() => {
			lockPaddingElements.forEach(lockPaddingElement => {
				lockPaddingElement.style.paddingRight = ''
			});
			document.body.style.paddingRight = ''
			document.documentElement.removeAttribute("data-fls-scrolllock")
		}, delay)
		bodyLockStatus = false
		setTimeout(function () {
			bodyLockStatus = true
		}, delay)
	}
}
export let bodyLock = (delay = 500) => {
	if (bodyLockStatus) {
		const lockPaddingElements = document.querySelectorAll("[data-fls-lp]")
		const lockPaddingValue = window.innerWidth - document.body.offsetWidth + 'px'
		lockPaddingElements.forEach(lockPaddingElement => {
			lockPaddingElement.style.paddingRight = lockPaddingValue
		});

		document.body.style.paddingRight = lockPaddingValue
		document.documentElement.setAttribute("data-fls-scrolllock", '')

		bodyLockStatus = false
		setTimeout(function () {
			bodyLockStatus = true
		}, delay)
	}
}
// РћС‚СЂРёРјР°С‚Рё С–Рј'СЏ РїРѕ Р·РЅР°С‡РµРЅРЅСЋ РІ РѕР±'С”РєС‚С–
export function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}
// РћС‚СЂРёРјР°С‚Рё С†РёС„СЂРё Р· СЂСЏРґРєР°
export function getDigFromString(item) {
	return parseInt(item.replace(/[^\d]/g, ''))
}
// Р¤РѕСЂРјР°С‚СѓРІР°РЅРЅСЏ С†РёС„СЂ С‚РёРїСѓ 100 000 000
export function getDigFormat(item, sepp = ' ') {
	return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${sepp}`);
}
// РџСЂРёР±СЂР°С‚Рё РєР»Р°СЃ Р· СѓСЃС–С… РµР»РµРјРµРЅС‚С–РІ РјР°СЃРёРІСѓ
export function removeClasses(array, className) {
	for (var i = 0; i < array.length; i++) {
		array[i].classList.remove(className);
	}
}
// РЈРЅС–РєР°Р»С–Р·Р°С†С–СЏ РјР°СЃРёРІСѓ
export function uniqArray(array) {
	return array.filter((item, index, self) => self.indexOf(item) === index)
}
// Р¤СѓРЅРєС†С–СЏ РѕС‚СЂРёРјР°РЅРЅСЏ С–РЅРґРµРєСЃСѓ РІСЃРµСЂРµРґРёРЅС– Р±Р°С‚СЊРєС–РІСЃСЊРєРѕРіРѕ РµР»РµРјРµРЅС‚Р°
export function indexInParent(parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};
// Р¤СѓРЅРєС†С–СЏ РїРµСЂРµРІС–СЂСЏС” С‡Рё РѕР±'С”РєС‚ РІРёРґРёРјРёР№
export function isHidden(el) {
	return (el.offsetParent === null)
}
// РћР±СЂРѕР±РєР° РјРµРґС–Р° Р·Р°РїРёС‚С–РІ Р· Р°С‚СЂРёР±СѓС‚С–РІ
export function dataMediaQueries(array, dataSetValue) {
	const media = Array.from(array)
		.filter(item => item.dataset[dataSetValue])
		.map(item => {
			const [value, type = 'max'] = item.dataset[dataSetValue].split(',');
			return { value, type, item };
		});

	if (media.length === 0) return [];

	// РћС‚СЂРёРјСѓС”РјРѕ СѓРЅС–РєР°Р»СЊРЅС– Р±СЂРµР№РєРїРѕС–РЅС‚Рё
	const breakpointsArray = media.map(({ value, type }) => `(${type}-width: ${value}px),${value},${type}`);
	const uniqueQueries = [...new Set(breakpointsArray)];

	return uniqueQueries.map(query => {
		const [mediaQuery, mediaBreakpoint, mediaType] = query.split(',');
		const matchMedia = window.matchMedia(mediaQuery);

		// Р¤С–Р»СЊС‚СЂСѓС”РјРѕ РѕР±'С”РєС‚Рё Р· РїРѕС‚СЂС–Р±РЅРёРјРё СѓРјРѕРІР°РјРё
		const itemsArray = media.filter(item => item.value === mediaBreakpoint && item.type === mediaType);

		return { itemsArray, matchMedia }
	});
}
// РњРѕРґСѓР»СЊ РїР»Р°РІРЅРѕС— РїСЂРѕРєС‚СѓС‚РєРё РґРѕ Р±Р»РѕРєСѓ
export const gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = '';
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = 'header.header';
			const headerElement = document.querySelector(headerItem);
			if (!headerElement.classList.contains('--header-scroll')) {
				headerElement.style.cssText = `transition-duration: 0s;`;
				headerElement.classList.add('--header-scroll');
				headerItemHeight = headerElement.offsetHeight;
				headerElement.classList.remove('--header-scroll');
				setTimeout(() => {
					headerElement.style.cssText = ``;
				}, 0);
			} else {
				headerItemHeight = headerElement.offsetHeight;
			}
		}
		// Р—Р°РєСЂРёРІР°С”РјРѕ РјРµРЅСЋ, СЏРєС‰Рѕ РІРѕРЅРѕ РІС–РґРєСЂРёС‚Рµ
		if (document.documentElement.hasAttribute("data-fls-menu-open")) {
			bodyUnlock(0)
			document.documentElement.removeAttribute("data-fls-menu-open")
		}
		// РџСЂРѕРєСЂСѓС‡СѓРІР°РЅРЅСЏ СЃС‚Р°РЅРґР°СЂС‚РЅРёРјРё Р·Р°СЃРѕР±Р°РјРё
		let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
		targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
		targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
		window.scrollTo({
			top: targetBlockElementPosition,
			behavior: "smooth"
		});
		FLS(`_FLS_SCROLLTO_GOTO`, targetBlock);
	} else {
		FLS(`_FLS_SCROLLTO_WARN`, targetBlock);
	}
}
export function formatDate(date, sepp) {
	const d = new Date(date);
	const day = String(d.getDate()).padStart(2, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const year = d.getFullYear();
	return `${day}${sepp}${month}${sepp}${year}`;
}

