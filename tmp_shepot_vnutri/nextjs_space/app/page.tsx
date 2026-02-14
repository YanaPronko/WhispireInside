import HeroSection from '@/components/sections/hero-section'
import AboutSection from '@/components/sections/about-section'
import ServicesSection from '@/components/sections/services-section'
import ContactFormSection from '@/components/sections/contact-form-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import FaqSection from '@/components/sections/faq-section'
import Footer from '@/components/sections/footer'
import Header from '@/components/sections/header'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactFormSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
