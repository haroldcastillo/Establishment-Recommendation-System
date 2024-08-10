"use client"
import React,{useState} from 'react'
import Image from 'next/image'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Button from '@mui/material/Button'
import { Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector ,useDispatch} from 'react-redux';
import { logoutUser } from '@/store/actions/auth';

export default function Header() {
  const dispatch = useDispatch();
  const userId = useSelector((state:any) => state.auth.utils.userId);

  const router = useRouter();
  const [openSearch, setOpenSearch] = useState(false)
  return (
    <div className='fixed top-0 w-[100vw] z-[40] h-[70px]'>
      <div className='bg-[#ADD8E6] px-4 py-3 flex justify-between items-center  pr-7'>
        <Link href={"/"}><Image src={"/images/Websitelogo.png"} alt='logo' width={150} height={150}/></Link>
        <div className='flex gap-4 translate-x-[-60px]'>
          <NavLink label='About' location='/about'/>
          <NavLink label='News' location='/news'/>
          <NavLink label='Contact' location='/contact'/>
        </div>
        <div className='flex gap-4'>
          {userId?<>
            <Button variant="text" color="primary" onClick={()=>{dispatch(logoutUser())}}>
              logout
            </Button>
            <IconButton aria-label=""  onClick={()=>{}}>
              <Avatar sx={{ width: 40, height: 40 }} src="/images/avatar.png" />
            </IconButton>
            </>:
            <>
              <Button variant="text" color="primary" onClick={()=>{router.push('/login')}}>
                Login
              </Button>
              <Button variant="contained" color="primary" onClick={()=>{router.push('/signup')}}>
                Sign Up
              </Button>
            </>
          }
        </div>
      </div>
      {/* {openSearch && <div className='bg-[#ADD8E6] p-4 flex justify-center items-center gap-4 pr-7'>
        <input type="text" placeholder="Search..." className='bg-[white] outline-none w-full p-2 rounded-lg'/>
        <Button variant="contained" color="primary">
          Search
        </Button>
      </div>} */}
    </div>
  )
}
function NavLink({label,location}: {label: string,location: string}){ 
  return<>
    <Link href={location}><p className='text-[14px] opacity-85 hover:opacity-100'>{label}</p></Link>
  </>
}
