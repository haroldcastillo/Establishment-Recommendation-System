import React from 'react'
import Container from '@mui/material/Container'
import {EstablishmentType} from '@/app/lib/constants'
import Button from '@mui/material/Button'

type PreferenceProps = {
  value: string[];
  setValue: (value: string[]) => void;
  setOpen: ()=>void;

}
export default function Preference({value, setValue,setOpen}: PreferenceProps) {
  
  const handlePreference = (preference: string) => {
    if(value.includes(preference)) {
      setValue(value.filter((item) => item !== preference))
    } else {
      setValue([...value, preference])
    }
  }

  return (
    <div className='p-4'>
      <Container maxWidth="lg" >
        <h5 className='text-[20px] font-semibold text-[black]/80 mt-[2em]'>Select your Preference </h5>
        <div className=' mx-auto max-w-[900px] flex-wrap min-h-[400px]  mt-[1em] flex justify-center items-center gap-4'>
          {
            EstablishmentType.map((type, index) => (
              <PreferenceCard key={index} title={type} onClick={()=>{handlePreference(type)}} value={value}/>
            ))
          }
        </div>
        <div className='flex justify-center gap-4 mt-4'>
          <Button variant="contained" style={{background:"white", color:"black"}} onClick={()=>{setOpen()}}>
            Skip
          </Button>
          <Button variant="contained" color="primary" className='w-[90px]'
            onClick={()=>{
              localStorage.setItem("preference", JSON.stringify(value))
            }}
          >
            Proceed
          </Button>
        </div>
      </Container>
    </div>
  )
}

function PreferenceCard({title,onClick,value}: {title: string, onClick:()=>void, value: string[]}) {
  
  return<>
    <div className={`bg-[white] p-4 rounded-lg shadow-md w-[240px] ${value.includes(title)?"border-primary border":"hover:border hover:border-[#e2e2e2]"} cursor-pointer hover:shadow-xl `} style={{transition:"all  .3s ease-in-out"}}
      onClick={()=>{onClick()}}
    >
      <h5 className={`text-[20px] font-semibold ${value.includes(title)&&"text-primary"}`}>{title}</h5>
      <p className='text-[14px] opacity-80'>Select your preference to get recommendation</p>
    </div>
  </>
}
