import './header.scss'
import '@components/layout/menu/menu.js'
import '@components/effects/darklite/darklite.js'
import '@components/effects/scrollto/scrollto.js'
import '@components/layout/header/plugins/scroll/scroll.js'

const initLangSwitcher = () => {
	const html = document.documentElement
	const langButtons = document.querySelectorAll('[data-fls-lang]')
	if (!langButtons.length) return

	const storedLang = localStorage.getItem('fls-user-lang') || html.lang || 'ru'
	html.lang = storedLang

	langButtons.forEach((button) => {
		button.classList.toggle('--active', button.dataset.flsLang === storedLang)
		button.addEventListener('click', () => {
			const nextLang = button.dataset.flsLang
			html.lang = nextLang
			localStorage.setItem('fls-user-lang', nextLang)
			langButtons.forEach((item) => item.classList.toggle('--active', item === button))
		})
	})
}

window.addEventListener('load', initLangSwitcher)
