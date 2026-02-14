'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    name: 'Елена',
    text: 'Мария помогла мне разобраться в сложной жизненной ситуации. Её расклады таро удивительно точны, а психологическая поддержка бесценна. Спасибо за вашу работу!',
    rating: 5,
  },
  {
    name: 'Анна',
    text: 'После консультации я почувствовала невероятное облегчение. Мария создаёт атмосферу доверия и безопасности. Карты показали то, о чём я даже не осознавала. Рекомендую!',
    rating: 5,
  },
  {
    name: 'Дмитрий',
    text: 'Скептически относился к таро, но Мария изменила моё мнение. Её профессионализм и глубина анализа поразили. Получил ответы на вопросы, которые мучили меня месяцами.',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="testimonials" ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="text-cyan-400 font-cormorant text-lg">Отзывы</span>
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Что говорят клиенты
          </h2>
          <p className="font-cormorant text-xl text-slate-300 max-w-2xl mx-auto">
            Истории тех, кто нашёл свой путь
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-cyan-500/20" />
              
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: testimonial?.rating ?? 0 })?.map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                )) ?? []}
              </div>

              {/* Text */}
              <p className="font-cormorant text-lg text-slate-300 leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial?.text}&rdquo;
              </p>

              {/* Name */}
              <p className="font-cinzel text-cyan-300 font-semibold">
                — {testimonial?.name}
              </p>
            </motion.div>
          )) ?? []}
        </div>
      </div>
    </section>
  )
}
