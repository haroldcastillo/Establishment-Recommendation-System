"use client"
import React from 'react'
import Container from '@mui/material/Container'
import Link from 'next/link'
export default function footer() {
  return <>
    <footer className='p-4 border-t border-[black]/20'>
      <Container maxWidth="lg" className='flex justify-between'>
        <p>©AtMarikina {new Date().getFullYear()} All Rights Reserved</p>
        <div className='flex gap-4'>
          <NavLink label='Home' location='/dashboard'/>
          <NavLink label='About' location='/dashboard/about'/>
          <NavLink label='News' location='/dashboard/news'/>
          <NavLink label='Contact' location='/dashboard/contact'/>
        </div>
      </Container>
    </footer>
  </>
}


const NavLink = ({ label, location }: { label: string, location: string }) => {
  return <>
    <Link href = { location } > <p className = 'text-[14px] opacity-85 hover:opacity-100' > { label } </p></Link >
  </>
}