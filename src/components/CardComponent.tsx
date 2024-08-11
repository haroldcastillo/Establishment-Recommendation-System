
import React from 'react'
import Button from '@mui/material/Button'
import LocationOnIcon from '@mui/icons-material/LocationOn';

type Props = {
  title: string,
  description: string,
  img: string,
  onClick?: ()=>void
}
export default function CardComponent({title, description, img,onClick}: Props) {
  return (
    <div className="rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className=' w-[100%] h-[250px]' style={{background:`url('../images/sss1.jpg')`,backgroundSize:"cover"}}/>
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
