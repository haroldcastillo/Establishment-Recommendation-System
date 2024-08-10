"use client"
import React from 'react'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Tooltip from '@mui/material/Tooltip'


export default function Establishment({params}) {
  return (
    <div className='mt-[70px] mx-auto max-w-screen-lg px-4 pt-[70px] pb-4'>
      {/* title */}
      <div className='flex justify-between mb-4 items-center' >
        <div>
          <h1 className='text-[20px] font-bold'>Establishment</h1>
          <h2 className='text-[14px]'><LocationOnIcon sx={{ fontSize: 15 }}/>Location</h2>
        </div>
        <Tooltip title="Add favorites">
          <IconButton aria-label="" onClick={()=>{}}>
            <FavoriteBorderIcon/>
          </IconButton>
        </Tooltip>
      </div>
      {/* Image */}
      <div className='flex min-h-[350px] overflow-hidden rounded-xl gap-2'>
        <div className='grow' style={{ backgroundImage: "url('../images/sss1.jpg')",backgroundSize:"cover" }} />
        <div className='w-[300px] hidden md:grid gap-2' style={{gridTemplateRows:"1fr 1fr"}}>
          <div style={{ backgroundImage: "url('../images/sss1.jpg')",backgroundSize:"cover" }} />
          <div style={{ backgroundImage: "url('../images/sss1.jpg')",backgroundSize:"cover" }}/>
        </div>
      </div>

      {/* Description */} 

      <div className='mt-4'>
        <h2 className='text-[18px] font-bold'>Description</h2>
        <p className='text-[14px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien
          vehicula malesuada. Nullam nec elit nec tortor malesuada ultricies. Nulla facilisi. 
          Nullam nec elit nec tortor malesuada ultricies. Nulla facilisi. Nullam nec elit nec
          tortor malesuada ultricies. Nulla facilisi. Nullam nec elit nec tortor malesuada ultricies.
          Nulla facilisi. Nullam nec
        </p>
      </div>




    </div>
  )
}
