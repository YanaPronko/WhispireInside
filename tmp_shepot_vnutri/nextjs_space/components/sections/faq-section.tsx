'use client'

import { motion } from 'framer-motion'
import { HelpCircle, Plus, Minus } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const faqs = [
  {
    question: 'Как проходит консультация?',
    answer: 'Консультация проходит в комфортной атмосфере. Мы обсуждаем вашу ситуацию, затем я делаю расклад таро и даю профессиональную интерпретацию с психологической точки зрения. В конце вы получаете рекомендации и ответы на волнующие вопросы.',
  },
  {
    question: 'Можно ли провести консультацию онлайн?',
    answer: 'Да, я провожу консультации как очно, так и онлайн через Zoom, скайп или другие удобные для вас платформы. Эффективность онлайн-консультаций не уступает очным встречам.',
  },
  {
    question: 'Нужно ли верить в таро, чтобы это работало?',
    answer: 'Нет, вера не является обязательным условием. Таро — это инструмент, который помогает раскрыть глубинные аспекты подсознания. Даже скептики находят в консультациях ценные инсайты.',
  },
  {
    question: 'Как часто можно приходить на консультации?',
    answer: 'Частота консультаций индивидуальна. Кто-то приходит раз в неделю для глубинной работы, кто-то — раз в месяц для поддержки. Мы обсудим оптимальный для вас режим на первой встрече.',
  },
  {
    question: 'Гарантируете ли вы конфиденциальность?',
    answer: 'Абсолютно. Всё, что обсуждается на консультациях, остаётся строго конфиденциальным. Я следую этическим принципам психологической практики и гарантирую полную конфиденциальность.',
  },
]

export default function FaqSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span className="text-cyan-400 font-cormorant text-lg">Ответы на вопросы</span>
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Частые вопросы
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-slate-800/70 transition-colors"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-cormorant text-lg md:text-xl text-cyan-300 pr-4">
                  {faq?.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-amber-400 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-amber-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-5"
                >
                  <p className="font-cormorant text-slate-300 leading-relaxed">
                    {faq?.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )) ?? []}
        </div>
      </div>
    </section>
  )
}
