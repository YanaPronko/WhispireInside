'use client'

import { Moon, Instagram, Send, MessageCircle, Phone, Mail } from 'lucide-react'

// VK icon component
const VkIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.19 14.14h-1.65c-.52 0-.68-.42-1.61-1.35-.82-.79-1.18-.9-1.39-.9-.28 0-.36.08-.36.49v1.23c0 .33-.11.53-1 .53-1.45 0-3.06-.88-4.19-2.52-1.69-2.35-2.16-4.12-2.16-4.48 0-.21.08-.4.49-.4h1.65c.37 0 .51.16.65.55.71 2.05 1.89 3.84 2.38 3.84.18 0 .27-.08.27-.55v-2.15c-.06-.97-.57-1.05-.57-1.39 0-.17.14-.33.36-.33h2.59c.31 0 .42.16.42.52v2.9c0 .31.14.42.23.42.18 0 .33-.11.67-.45 1.04-1.17 1.79-2.97 1.79-2.97.1-.21.26-.4.67-.4h1.65c.49 0 .6.25.49.59-.18.83-1.96 3.18-1.96 3.18-.15.25-.21.36 0 .65.15.21.64.63 1 1.02.65.7 1.14 1.29 1.27 1.7.14.4-.08.61-.49.61z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Moon className="w-8 h-8 text-cyan-400" />
              <span className="font-cinzel text-2xl font-bold text-gradient-gold">Шепот внутри</span>
            </div>
            <p className="font-cormorant text-slate-400 leading-relaxed">
              Психологические консультации и расклады таро для глубокого понимания себя
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-xl font-semibold text-cyan-300 mb-4">Контакты</h3>
            <div className="space-y-3">
              <a
                href="tel:+79991234567"
                className="flex items-center space-x-3 text-slate-400 hover:text-cyan-400 transition-colors font-cormorant"
              >
                <Phone className="w-5 h-5" />
                <span>+7 (999) 123-45-67</span>
              </a>
              <a
                href="mailto:yaniarz89@gmail.com"
                className="flex items-center space-x-3 text-slate-400 hover:text-cyan-400 transition-colors font-cormorant"
              >
                <Mail className="w-5 h-5" />
                <span>yaniarz89@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-xl font-semibold text-cyan-300 mb-4">Социальные сети</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-400 hover:text-pink-400 hover:bg-slate-800 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://t.me/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-all hover:scale-110"
                aria-label="Telegram"
              >
                <Send className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/79991234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-slate-800 transition-all hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="https://vk.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-slate-800 transition-all hover:scale-110"
                aria-label="VK"
              >
                <VkIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="font-cormorant text-slate-500">
            &copy; {new Date().getFullYear()} Шепот внутри. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
