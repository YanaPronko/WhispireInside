// Basic polyfills for older browsers/webviews.
(function () {
	if (typeof window === 'undefined') return;

	// Element.matches
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.msMatchesSelector ||
			Element.prototype.webkitMatchesSelector;
	}

	// Element.closest
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (selector) {
			let el = this;
			while (el && el.nodeType === 1) {
				if (el.matches(selector)) return el;
				el = el.parentElement || el.parentNode;
			}
			return null;
		};
	}

	// NodeList.forEach
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}

	// CustomEvent
	if (typeof window.CustomEvent !== 'function') {
		const CustomEventPolyfill = function (event, params) {
			params = params || { bubbles: false, cancelable: false, detail: null };
			const evt = document.createEvent('CustomEvent');
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
		};
		CustomEventPolyfill.prototype = window.Event.prototype;
		window.CustomEvent = CustomEventPolyfill;
	}
})();

