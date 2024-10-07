"use client"

import Menubar from '@/components/home/Menubar/Menubar'
import Navigation from '@/components/home/Navigation'
import Main from '@/components/home/Main'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
    <div className=' w-full mb-2'>
    <Menubar/>
    </div>
    <div className="flex flex-1">
      <Navigation />
      <Main />
    </div>
    </div>
  )
}
