
"use client"
import React from 'react'
import Button from '@mui/material/Button'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteComponent from './FavoriteComponent';
import { useSelector } from 'react-redux';
type Props = {
  title: string,
  description: string,
  img: string,
  id: string,
  creatorId: string,
  onClick?: ()=>void
}
export default function CardComponent({title, description, img,onClick,id,creatorId}: Props) {
  const user = useSelector((state:any) => state.auth?.utils.userId);
  return (
    <div className="rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className=' w-[100%] h-[250px] flex justify-end items-start' style={{background:`url('../images/sss1.jpg')`,backgroundSize:"cover"}}>
        {creatorId !== user && <FavoriteComponent id={id}/>}
        
      </div>
      <div className='p-4'>
        <p className='grow text-[17px] font-semibold first-letter:uppercase'>{title}</p>
        <p className='text-primary text-[14px] '><LocationOnIcon/>{description}</p>
        <Button fullWidth variant="contained" className='mt-4' color="primary" onClick={onClick}>
          Visit
        </Button>
      </div>
    </div>
  )
}
