import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SIMPSON FX AI',
  description: 'Next-Gen Chart Analysis Engine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
