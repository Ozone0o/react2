import "@/styles/globals.css"
import "@/styles/markdown.css"
import type { Metadata } from 'next'
import AppContextProvider from '@/components/appcontext'

export const metadata: Metadata = {
  title: 'Chat BUPT',
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