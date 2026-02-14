import { b as bodyLockToggle, a as bodyLockStatus, c as bodyUnlock, g as gotoBlock, d as getHash } from "./common.min.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep, importerUrl);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (!!importerUrl) for (let i$1 = links.length - 1; i$1 >= 0; i$1--) {
        const link$1 = links[i$1];
        if (link$1.href === dep && (!isCss || link$1.rel === "stylesheet")) return;
      }
      else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const initHeroParallax = async () => {
  const hasHeroParallax = document.querySelector("[data-fls-parallax-parent]");
  if (!hasHeroParallax) return;
  const enableParallax = window.matchMedia("(min-width: 992px)").matches && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  if (!enableParallax) {
    document.querySelectorAll("[data-fls-parallax-parent],[data-fls-parallax]").forEach((el) => {
      el.removeAttribute("data-fls-parallax-parent");
      el.removeAttribute("data-fls-parallax");
    });
    return;
  }
  await __vitePreload(() => Promise.resolve().then(() => parallax), true ? void 0 : void 0, import.meta.url);
};
const initHeroScrollArrow = () => {
  const hero = document.querySelector(".hero");
  const arrow = document.querySelector("[data-hero-scroll]");
  const content = document.querySelector(".hero__content");
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
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
};
window.addEventListener("load", initHeroScrollArrow);
window.addEventListener("load", initHeroParallax);
function menuInit() {
  document.addEventListener("click", function(e) {
    if (bodyLockStatus && e.target.closest("[data-fls-menu]")) {
      bodyLockToggle();
      document.documentElement.toggleAttribute("data-fls-menu-open");
    }
  });
}
document.querySelector("[data-fls-menu]") ? window.addEventListener("load", menuInit) : null;
function getHours() {
  const now = /* @__PURE__ */ new Date();
  const hours = now.getHours();
  return hours;
}
function darkliteInit() {
  const htmlBlock = document.documentElement;
  const saveUserTheme = localStorage.getItem("fls-user-theme");
  let userTheme;
  if (document.querySelector("[data-fls-darklite-time]")) {
    let customRange = document.querySelector("[data-fls-darklite-time]").dataset.flsDarkliteTime;
    customRange = customRange || "18,5";
    const timeFrom = +customRange.split(",")[0];
    const timeTo = +customRange.split(",")[1];
    console.log(timeFrom);
    userTheme = getHours() >= timeFrom && getHours() <= timeTo ? "dark" : "light";
  } else {
    if (window.matchMedia) {
      userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      !saveUserTheme ? changeTheme() : null;
    });
  }
  const themeButtons = document.querySelectorAll("[data-fls-darklite-set]");
  const resetButton = document.querySelector("[data-fls-darklite-reset]");
  if (themeButtons.length) {
    themeButtons.forEach((themeButton) => {
      themeButton.addEventListener("click", function() {
        changeTheme(true);
      });
    });
  }
  if (resetButton) {
    resetButton.addEventListener("click", function(e) {
      localStorage.setItem("fls-user-theme", "");
    });
  }
  function setThemeClass() {
    htmlBlock.setAttribute(`data-fls-darklite-${saveUserTheme ? saveUserTheme : userTheme}`, "");
  }
  setThemeClass();
  function changeTheme(saveTheme = false) {
    let currentTheme = htmlBlock.hasAttribute("data-fls-darklite-light") ? "light" : "dark";
    let newTheme;
    if (currentTheme === "light") {
      newTheme = "dark";
    } else if (currentTheme === "dark") {
      newTheme = "light";
    }
    htmlBlock.removeAttribute(`data-fls-darklite-${currentTheme}`);
    htmlBlock.setAttribute(`data-fls-darklite-${newTheme}`, "");
    saveTheme ? localStorage.setItem("fls-user-theme", newTheme) : null;
  }
}
document.querySelector("[data-fls-darklite]") ? window.addEventListener("load", darkliteInit) : null;
function pageNavigation() {
  document.addEventListener("click", pageNavigationAction);
  document.addEventListener("watcherCallback", pageNavigationAction);
  function pageNavigationAction(e) {
    if (e.type === "click") {
      const targetElement = e.target;
      if (targetElement.closest("[data-fls-scrollto]")) {
        const gotoLink = targetElement.closest("[data-fls-scrollto]");
        const gotoLinkSelector = gotoLink.dataset.flsScrollto ? gotoLink.dataset.flsScrollto : "";
        const noHeader = gotoLink.hasAttribute("data-fls-scrollto-header") ? true : false;
        const gotoSpeed = gotoLink.dataset.flsScrolltoSpeed ? gotoLink.dataset.flsScrolltoSpeed : 500;
        const offsetTop = gotoLink.dataset.flsScrolltoTop ? parseInt(gotoLink.dataset.flsScrolltoTop) : 0;
        if (window.fullpage) {
          const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fls-fullpage-section]");
          const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.flsFullpageId : null;
          if (fullpageSectionId !== null) {
            window.fullpage.switchingSection(fullpageSectionId);
            if (document.documentElement.hasAttribute("data-fls-menu-open")) {
              bodyUnlock();
              document.documentElement.removeAttribute("data-fls-menu-open");
            }
          }
        } else {
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        }
        e.preventDefault();
      }
    } else if (e.type === "watcherCallback" && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;
      if (targetElement.dataset.flsWatcher === "navigator") {
        document.querySelector(`[data-fls-scrollto].--navigator-active`);
        let navigatorCurrentItem;
        if (targetElement.id && document.querySelector(`[data-fls-scrollto="#${targetElement.id}"]`)) {
          navigatorCurrentItem = document.querySelector(`[data-fls-scrollto="#${targetElement.id}"]`);
        } else if (targetElement.classList.length) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];
            if (document.querySelector(`[data-fls-scrollto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(`[data-fls-scrollto=".${element}"]`);
              break;
            }
          }
        }
        if (entry.isIntersecting) {
          navigatorCurrentItem ? navigatorCurrentItem.classList.add("--navigator-active") : null;
        } else {
          navigatorCurrentItem ? navigatorCurrentItem.classList.remove("--navigator-active") : null;
        }
      }
    }
  }
  if (getHash()) {
    let goToHash;
    if (document.querySelector(`#${getHash()}`)) {
      goToHash = `#${getHash()}`;
    } else if (document.querySelector(`.${getHash()}`)) {
      goToHash = `.${getHash()}`;
    }
    goToHash ? gotoBlock(goToHash) : null;
  }
}
document.querySelector("[data-fls-scrollto]") ? window.addEventListener("load", pageNavigation) : null;
const initLangSwitcher = () => {
  const html = document.documentElement;
  const langButtons = document.querySelectorAll("[data-fls-lang]");
  if (!langButtons.length) return;
  const storedLang = localStorage.getItem("fls-user-lang") || html.lang || "ru";
  html.lang = storedLang;
  langButtons.forEach((button) => {
    button.classList.toggle("--active", button.dataset.flsLang === storedLang);
    button.addEventListener("click", () => {
      const nextLang = button.dataset.flsLang;
      html.lang = nextLang;
      localStorage.setItem("fls-user-lang", nextLang);
      langButtons.forEach((item) => item.classList.toggle("--active", item === button));
    });
  });
};
window.addEventListener("load", initLangSwitcher);
class Parallax {
  constructor(elements) {
    if (elements.length) {
      this.elements = Array.from(elements).map((el) => new Parallax.Each(el, this.options));
    }
  }
  destroyEvents() {
    this.elements.forEach((el) => {
      el.destroyEvents();
    });
  }
  setEvents() {
    this.elements.forEach((el) => {
      el.setEvents();
    });
  }
}
Parallax.Each = class {
  constructor(parent) {
    this.parent = parent;
    this.elements = this.parent.querySelectorAll("[data-fls-parallax]");
    this.animation = this.animationFrame.bind(this);
    this.offset = 0;
    this.value = 0;
    this.smooth = parent.dataset.flsParallaxSmooth ? Number(parent.dataset.flsParallaxSmooth) : 15;
    this.setEvents();
  }
  setEvents() {
    this.animationID = window.requestAnimationFrame(this.animation);
  }
  destroyEvents() {
    window.cancelAnimationFrame(this.animationID);
  }
  animationFrame() {
    const topToWindow = this.parent.getBoundingClientRect().top;
    const heightParent = this.parent.offsetHeight;
    const heightWindow = window.innerHeight;
    const positionParent = {
      top: topToWindow - heightWindow,
      bottom: topToWindow + heightParent
    };
    const centerPoint = this.parent.dataset.flsParallaxCenter ? this.parent.dataset.flsParallaxCenter : "center";
    if (positionParent.top < 30 && positionParent.bottom > -30) {
      switch (centerPoint) {
        // верхній точці (початок батька стикається верхнього краю екрану)
        case "top":
          this.offset = -1 * topToWindow;
          break;
        // центрі екрана (середина батька у середині екрана)
        case "center":
          this.offset = heightWindow / 2 - (topToWindow + heightParent / 2);
          break;
        // Початок: нижня частина екрана = верхня частина батька
        case "bottom":
          this.offset = heightWindow - (topToWindow + heightParent);
          break;
      }
    }
    this.value += (this.offset - this.value) / this.smooth;
    this.animationID = window.requestAnimationFrame(this.animation);
    this.elements.forEach((el) => {
      const parameters = {
        axis: el.dataset.axis ? el.dataset.axis : "v",
        direction: el.dataset.flsParallaxDirection ? el.dataset.flsParallaxDirection + "1" : "-1",
        coefficient: el.dataset.flsParallaxCoefficient ? Number(el.dataset.flsParallaxCoefficient) : 5,
        additionalProperties: el.dataset.flsParallaxProperties ? el.dataset.flsParallaxProperties : ""
      };
      this.parameters(el, parameters);
    });
  }
  parameters(el, parameters) {
    if (parameters.axis == "v") {
      el.style.transform = `translate3D(0, ${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0) ${parameters.additionalProperties}`;
    } else if (parameters.axis == "h") {
      el.style.transform = `translate3D(${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0,0) ${parameters.additionalProperties}`;
    }
  }
};
if (document.querySelector("[data-fls-parallax-parent]")) {
  new Parallax(document.querySelectorAll("[data-fls-parallax-parent]"));
}
const parallax = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
