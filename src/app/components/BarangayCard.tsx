import React from 'react'
import Button from '@mui/material/Button'
import LocationOnIcon from '@mui/icons-material/LocationOn';
type Props = {
  title: string,
  description: string,
  img: string,
}
export default function BarangayCard({title, description, img}: Props) {
  return (
    <div className="rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className=' w-[100%] h-[250px]' style={{background:`url('${img}') no-repeat`,backgroundSize:"cover"}}/>
      <div className='p-4 flex flex-col grow'>
        <p className='text-primary text-[17px] font-semibold'><LocationOnIcon/>{title}</p>
        <p className='grow'>{description}</p>
        <Button fullWidth variant="contained" className='mt-4' color="primary">
          learn more
        </Button>
      </div>
    </div>
  )
}
