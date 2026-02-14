'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Brain, Sparkles, Target, Check } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const services = [
  {
    title: 'Психологическая консультация',
    description: 'Глубокая психологическая работа с внутренними конфликтами, страхами и эмоциональными травмами',
    price: 'от 5000 ₽',
    duration: '60 минут',
    icon: Brain,
    image: 'https://images.squarespace-cdn.com/content/v1/5d1d73854d6d790001242ecd/69243067-3acd-4bc2-9055-45ed28861e07/two-wander-the-moon-tarot-card-9.jpg',
    features: [
      'Работа с глубинными страхами',
      'Проработка травм',
      'Поиск жизненного пути',
      'Гармонизация внутреннего состояния',
    ],
  },
  {
    title: 'Расклад на будущее',
    description: 'Комплексный расклад таро на волнующий вопрос или жизненную ситуацию',
    price: 'от 3500 ₽',
    duration: '45 минут',
    icon: Sparkles,
    image: 'http://static1.squarespace.com/static/5d1d73854d6d790001242ecd/5d2302fa1407cc0001a7a086/641060f5295b904eda342c7e/1744566207996/two-wander-star-tarot-card-meaning.jpg?format=1500w',
    features: [
      'Прогноз развития ситуации',
      'Ответы на важные вопросы',
      'Понимание скрытых процессов',
      'Рекомендации по действиям',
    ],
  },
  {
    title: 'Расклад на цель',
    description: 'Проработка конкретной цели или задачи, анализ путей достижения',
    price: 'от 4000 ₽',
    duration: '50 минут',
    icon: Target,
    image: 'https://www.pagangrimoire.com/wp-content/uploads/2025/06/the-sun-tarot-card-meaning.jpg',
    features: [
      'Анализ путей достижения',
      'Выявление препятствий',
      'Поиск ресурсов',
      'План действий',
    ],
  },
]

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-cyan-400 font-cormorant text-lg">Что я предлагаю</span>
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Услуги и тарифы
          </h2>
          <p className="font-cormorant text-xl text-slate-300 max-w-2xl mx-auto">
            Выберите подходящий формат работы
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services?.map((service, index) => {
            const Icon = service?.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-slate-800/70 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={service?.image ?? ''}
                    alt={service?.title ?? ''}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 bg-amber-500/20 backdrop-blur-sm p-3 rounded-full">
                    {Icon && <Icon className="w-6 h-6 text-amber-400" />}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-cinzel text-2xl font-semibold text-cyan-300">
                    {service?.title}
                  </h3>
                  <p className="font-cormorant text-slate-300 leading-relaxed">
                    {service?.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service?.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-400">
                        <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="font-cormorant">{feature}</span>
                      </li>
                    )) ?? []}
                  </ul>

                  {/* Price & Duration */}
                  <div className="pt-4 border-t border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-cormorant">Длительность:</span>
                      <span className="text-cyan-300 font-semibold">{service?.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-cormorant">Стоимость:</span>
                      <span className="text-amber-400 font-bold text-xl">{service?.price}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={scrollToContact}
                    className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-cyan-500/50"
                  >
                    Записаться
                  </button>
                </div>
              </motion.div>
            )
          }) ?? []}
        </div>
      </div>
    </section>
  )
}
