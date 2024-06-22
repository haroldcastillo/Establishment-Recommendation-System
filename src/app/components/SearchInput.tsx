'use client'
import React,{useState} from 'react'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
type SearchInputProps = {
  value: string;
  setValue: (value: string) => void;
}
export default function SearchInput({value,setValue}: SearchInputProps) {
  const [search, setSearch] = useState('')
  return (
    <div className='bg-[white] border border-black/50 rounded-full w-[300px] overflow-hidden  flex '>
      <input type="text" placeholder="Search..." value={search} onChange={(e)=>{setSearch(e.target.value)}} className=' outline-none w-full p-2 rounded-lg'/>
      <IconButton aria-label="" onClick={()=>{ 
        setValue(search)
      }}>
        <SearchIcon sx={{color:"black"}}/>
      </IconButton>
    </div>
  )
}
