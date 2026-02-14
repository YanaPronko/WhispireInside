import { Toaster as HotToaster } from 'react-hot-toast'

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'Cormorant Garamond, serif',
        },
        success: {
          iconTheme: {
            primary: '#06b6d4',
            secondary: '#e2e8f0',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#e2e8f0',
          },
        },
      }}
    />
  )
}
