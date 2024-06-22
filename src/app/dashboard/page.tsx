"use client"
import React,{useState} from 'react'
import IconButton from '@mui/material/IconButton'
import CircleIcon from '@mui/icons-material/Circle';
import Container from '@mui/material/Container'
import BarangayCard from '../components/BarangayCard';
import {Barangay} from '../lib/constants';
export default function page() {
  const videos = [
    "/images/vid-1.mp4",
    "/images/vid-2.mp4",
    "/images/vid-3.mp4",
    "/images/vid-4.mp4",
    "/images/vid-5.mp4"
  ]

  const [ videoIndex, setVideoIndex ] = useState(0)
  return <>
    <section className=''>
      <div className='min-h-[93vh] relative flex items-center justify-center'>
        <video src={videos[videoIndex]} autoPlay className="absolute z-[-1] w-full h-full object-cover" loop muted></video>
        <div className=' z-[1] text-center flex flex-col items-center'>
          <h1 className="text-[white] text-[70px] font-bold">@MARIKINA </h1>
          <p className="text-[white] text-[30px]">Travel Aid Website</p>
          <div className='flex rounded-full mt-[6em] bg-secondary'>
            {
              videos.map((_, index) => (
                <IconButton key={index} onClick={()=>{setVideoIndex(index)}}>
                  <CircleIcon sx={{color: videoIndex === index? "#1976D2" : "white"}}/>
                </IconButton>
              ))
            }
          </div>
        </div>
      </div>
      <Container maxWidth="lg" className='mx-auto px-2 py-5'>
        <h1 className='text-[20px] font-semibold mb-4 opacity-80'>Recommendation</h1>
        <div className='grid gap-4' style={{gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))"}}>
          {
            Barangay.map((barangay, index) => (
              <BarangayCard key={index} title={barangay.name} description={barangay.description} img={barangay.image}/>
            ))
          }
        </div>
      </Container>
      
    </section>
  </>
}
