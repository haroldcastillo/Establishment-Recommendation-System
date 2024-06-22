import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
interface Props {
  label: string,
  type: string,
  placeholder: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name:string,
  error?:Boolean
  errorMessages:string | undefined
}
export default function Textfield({label,type,placeholder,value,name,onChange,error,errorMessages}:Props) {
  return (
    <div>
      <p className={`mb-2  font-[500] ${error?"text-[#ff1d1ddc]":"text-[#646464]"}`}>{label}</p>
      <input className={`w-full p-2 rounded-xl border-2 flex items-center gap-2 ${error ? "border-[#ff1d1ddc]" : "border-[#D9D9D9]"}`} type={type} placeholder={placeholder} value={value} onChange={onChange} name={name}/>
      {error && <div className='flex gap-1 px-2 items-center  mt-[.5em]'>
        <ErrorOutlineIcon sx={{color:"#ff1d1ddc",fontSize:"16px"}}/>
        <p className='text-[#ff1d1ddc] text-[12px] '> {errorMessages}</p>
      </div>}
    </div>
  )
}
