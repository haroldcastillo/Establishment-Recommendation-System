'use client'
import React,{useState} from 'react'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput({value,setValue}) {
  const [search, setSearch] = useState('')


  return (
    <div className='bg-[white] border border-black/50 rounded-full w-[300px] overflow-hidden  flex '>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if(e.target.value === ''){
            setValue('')    
          }
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setValue(search);
          }
        }}
        className='outline-none w-full p-2 rounded-lg'
      />
      <IconButton 
        aria-label=""
        onClick={() => {
          setValue(search);
        }}
      >
        <SearchIcon sx={{ color: 'black' }} />
      </IconButton>
    </div>
  );
}