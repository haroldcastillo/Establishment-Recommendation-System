"use client"
import React,{useState} from 'react'
import Image from 'next/image'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Button from '@mui/material/Button'
export default function Header() {
  const [openSearch, setOpenSearch] = useState(false)
  return (
    <div className='fixed top-0 w-[100vw] z-[40]'>
      <div className='bg-[#ADD8E6] px-4 py-3 flex justify-between items-center  pr-7'>
        <Link href={"/dashboard"}><Image src={"/images/Websitelogo.png"} alt='logo' width={150} height={150}/></Link>
        <div className='flex gap-4 translate-x-[-60px]'>
          <NavLink label='About' location='/dashboard/about'/>
          <NavLink label='News' location='/news'/>
          <NavLink label='Contact' location='/dashboard/contact'/>
        </div>
        <div className=''>
          <IconButton aria-label=""  onClick={()=>{setOpenSearch(!openSearch)}}>
            {openSearch? <CloseIcon sx={{color:"black"}}/>:<SearchIcon sx={{color:"black"}}/> }
          </IconButton>
        </div>
      </div>
      {openSearch && <div className='bg-[#ADD8E6] p-4 flex justify-center items-center gap-4 pr-7'>
        <input type="text" placeholder="Search..." className='bg-[white] outline-none w-full p-2 rounded-lg'/>
        <Button variant="contained" color="primary">
          Search
        </Button>
      </div>}
    </div>
  )
}
function NavLink({label,location}: {label: string,location: string}){ 
  return<>
    <Link href={location}><p className='text-[14px] opacity-85 hover:opacity-100'>{label}</p></Link>
  </>
}
