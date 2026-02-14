'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Sparkles, Moon, Star } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="text-cyan-400 font-cormorant text-lg">Познакомьтесь</span>
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            О психологе
          </h2>
          <p className="font-cormorant text-xl text-slate-300 max-w-2xl mx-auto">
            Путешествие к гармонии с опытным проводником
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://cdn.abacus.ai/images/fee93e58-4136-4086-bcb6-71b3ac502074.png"
                alt="Психолог-специалист по таро"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 opacity-50">
              <Image
                src="https://cdn.abacus.ai/images/ced561ff-2d5f-4ccf-aaab-f95e18c223f7.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-cinzel text-2xl md:text-3xl font-semibold text-cyan-300">
                Мария Александровна
              </h3>
              <p className="font-cormorant text-lg text-slate-300 leading-relaxed">
                Психолог-консультант с более чем <span className="text-amber-400 font-semibold">10-летним опытом</span> работы в области глубинной психологии и таро-консультирования. Специализируюсь на работе с глубинными страхами, внутренними конфликтами и поиском жизненного пути.
              </p>
              <p className="font-cormorant text-lg text-slate-300 leading-relaxed">
                Мой подход сочетает современные психологические методики с древней мудростью таро. Карты становятся зеркалом, которое помогает увидеть то, что скрыто в глубинах подсознания.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Heart, text: 'Индивидуальный подход' },
                { icon: Sparkles, text: 'Глубинная работа' },
                { icon: Moon, text: 'Конфиденциальность' },
                { icon: Star, text: '10+ лет опыта' },
              ]?.map((feature, index) => {
                const Icon = feature?.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-3 bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm hover:bg-slate-800/70 transition-colors"
                  >
                    {Icon && <Icon className="w-5 h-5 text-amber-400 flex-shrink-0" />}
                    <span className="font-cormorant text-slate-200">{feature?.text}</span>
                  </motion.div>
                )
              }) ?? []}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
