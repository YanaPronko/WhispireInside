'use client'

import { useState, useEffect } from 'react'
import { Moon, Sparkles, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { label: 'О психологе', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Контакты', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-slate-950/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center space-x-2 group"
            >
              <Moon className="w-6 h-6 text-cyan-400 group-hover:text-amber-400 transition-colors" />
              <span className="font-cinzel text-xl font-bold text-gradient-gold">Шепот внутри</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems?.map((item) => (
                <button
                  key={item?.href}
                  onClick={() => scrollToSection(item?.href ?? '')}
                  className="text-slate-300 hover:text-amber-400 transition-colors font-cormorant text-lg"
                >
                  {item?.label}
                </button>
              )) ?? []}
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Записаться</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col space-y-4 p-6">
              {menuItems?.map((item) => (
                <button
                  key={item?.href}
                  onClick={() => scrollToSection(item?.href ?? '')}
                  className="text-slate-300 hover:text-amber-400 transition-colors font-cormorant text-lg text-left"
                >
                  {item?.label}
                </button>
              )) ?? []}
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-medium flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Записаться</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
