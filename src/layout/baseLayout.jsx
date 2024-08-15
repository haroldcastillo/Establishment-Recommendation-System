import React from 'react'
import Header from '@/app/layout/header'
import Footer from '@/app/layout/footer'

export default function baseLayout({children}) {
  return<>
    <div className='flex flex-col min-h-[100vh] '>
      <Header />
      <main className='grow'>
        {children}
      </main>
      <Footer />
    </div>
  </>
}
