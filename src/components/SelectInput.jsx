"use client"
import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function SelectInput({label,value,name,onChange,error,errorMessages,options}) {
  return (
    <div>
      <p className={`mb-2  font-[500] ${error?"text-[#ff1d1ddc]":"text-[#646464]"}`}>{label}</p>
      <select className={`w-full p-2 rounded-xl border-2 flex items-center gap-2 ${error ? "border-[#ff1d1ddc]" : "border-[#D9D9D9]"}`} value={value} onChange={onChange} name={name}>
        {options.map((option,index)=>(
          <option key={index} value={option} selected={index === 0}>{option}</option>
        ))}
      </select>
      {error && <div className='flex gap-1 px-2 items-center  mt-[.5em]'>
        <ErrorOutlineIcon sx={{color:"#ff1d1ddc",fontSize:"16px"}}/>
        <p className='text-[#ff1d1ddc] text-[12px] '> {errorMessages}</p>
      </div>}
    </div>
    
  )
}
