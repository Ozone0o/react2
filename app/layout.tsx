import "@/styles/globals.css"

import type { Metadata } from 'next'
import AppContextProvider from '@/components/appcontext'

export const metadata: Metadata = {
  title: 'SimuCustomer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><AppContextProvider>{children}</AppContextProvider></body>
    </html>
  )
}