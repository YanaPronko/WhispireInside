'use client'

import { motion } from 'framer-motion'
import { Send, Sparkles, Calendar, Phone, Mail, MessageSquare } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const serviceOptions = [
  'Психологическая консультация',
  'Расклад на будущее',
  'Расклад на цель',
]

export default function ContactFormSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    serviceType: '',
    desiredDate: '',
    phone: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.serviceType || !formData.desiredDate || !formData.phone || !formData.email) {
      toast.error('Пожалуйста, заполните все обязательные поля')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result?.success) {
        toast.success('Заявка успешно отправлена! Я свяжусь с вами в ближайшее время.')
        // Reset form
        setFormData({
          serviceType: '',
          desiredDate: '',
          phone: '',
          email: '',
          message: '',
        })
      } else {
        toast.error(result?.message ?? 'Произошла ошибка. Попробуйте ещё раз.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Произошла ошибка. Попробуйте ещё раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-cyan-400 font-cormorant text-lg">Начните свой путь</span>
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Записаться на консультацию
          </h2>
          <p className="font-cormorant text-xl text-slate-300">
            Оставьте заявку, и я свяжусь с вами в ближайшее время
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl space-y-6"
        >
          {/* Service Type */}
          <div className="space-y-2">
            <label htmlFor="serviceType" className="flex items-center space-x-2 text-cyan-300 font-cormorant text-lg">
              <Sparkles className="w-5 h-5" />
              <span>Выберите услугу *</span>
            </label>
            <div className="relative">
              <select
                id="serviceType"
                name="serviceType"
                value={formData?.serviceType ?? ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white font-cormorant focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="">Выберите...</option>
                {serviceOptions?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )) ?? []}
              </select>
            </div>
          </div>

          {/* Desired Date */}
          <div className="space-y-2">
            <label htmlFor="desiredDate" className="flex items-center space-x-2 text-cyan-300 font-cormorant text-lg">
              <Calendar className="w-5 h-5" />
              <span>Желаемая дата *</span>
            </label>
            <input
              type="date"
              id="desiredDate"
              name="desiredDate"
              value={formData?.desiredDate ?? ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 pl-4 bg-slate-900/50 border border-slate-700 rounded-lg text-white font-cormorant focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="flex items-center space-x-2 text-cyan-300 font-cormorant text-lg">
              <Phone className="w-5 h-5" />
              <span>Телефон *</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData?.phone ?? ''}
              onChange={handleChange}
              placeholder="+7 (999) 123-45-67"
              required
              className="w-full px-4 py-3 pl-4 bg-slate-900/50 border border-slate-700 rounded-lg text-white font-cormorant placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center space-x-2 text-cyan-300 font-cormorant text-lg">
              <Mail className="w-5 h-5" />
              <span>Email *</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email ?? ''}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 pl-4 bg-slate-900/50 border border-slate-700 rounded-lg text-white font-cormorant placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="flex items-center space-x-2 text-cyan-300 font-cormorant text-lg">
              <MessageSquare className="w-5 h-5" />
              <span>Ваше сообщение</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData?.message ?? ''}
              onChange={handleChange}
              rows={5}
              placeholder="Расскажите о том, что вас волнует..."
              className="w-full px-4 py-3 pl-4 bg-slate-900/50 border border-slate-700 rounded-lg text-white font-cormorant placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed rounded-full text-white font-medium text-lg transition-all shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span>Отправка...</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Отправить заявку</span>
              </>
            )}
          </button>

          <p className="text-sm text-slate-400 text-center font-cormorant">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных
          </p>
        </motion.form>
      </div>
    </section>
  )
}
