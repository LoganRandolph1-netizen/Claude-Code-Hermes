import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agenthusiast HQ — Operating System',
  description: 'Agenthusiast HQ cyberpunk operating system interface',
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
