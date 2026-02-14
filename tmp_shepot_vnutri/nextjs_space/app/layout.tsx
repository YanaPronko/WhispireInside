import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cinzel, Cormorant_Garamond } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })
const cormorant = Cormorant_Garamond({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '600', '700'], variable: '--font-cormorant' })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Шепот внутри | Психолог-специалист по таро',
  description: 'Психологические консультации и расклады таро. Откройте путь к глубокому пониманию себя через мудрость карт и профессиональную психологическую поддержку.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Шепот внутри | Психолог-специалист по таро',
    description: 'Психологические консультации и расклады таро',
    images: ['/og-image.png'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={`${inter.variable} ${cinzel.variable} ${cormorant.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
