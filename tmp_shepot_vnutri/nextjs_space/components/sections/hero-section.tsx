'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, ArrowDown } from 'lucide-react'
import { useRef } from 'react'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="https://media.istockphoto.com/id/465405755/photo/midnight-blue-coastal-moonrise-with-dramatic-sky-and-rolling-waves.jpg?s=612x612&w=0&k=20&c=nj_KLKCaaxQeqM_FfponuByuayAMHbVeLqsXdzJ7YBY="
            alt="Мистический океан с волнами"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center space-x-2 mb-6"
        >
          <Sparkles className="w-6 h-6 text-amber-400" />
          <span className="text-cyan-300 font-cormorant text-lg">Психолог-специалист по таро</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient-gold"
        >
          Шепот внутри
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-cormorant text-xl sm:text-2xl md:text-3xl text-slate-200 max-w-3xl mb-12 leading-relaxed"
        >
          Откройте путь к глубокому пониманию себя через мудрость карт и профессиональную психологическую поддержку
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={scrollToContact}
          className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full text-white font-medium text-lg transition-all shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 flex items-center space-x-2"
        >
          <span>Записаться на консультацию</span>
          <Sparkles className="w-5 h-5" />
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-8 h-8 text-cyan-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
