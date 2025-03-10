import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Xplora',
  description: 'Place where learning is interactive',
  generator: 'Xplora.xyz',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
