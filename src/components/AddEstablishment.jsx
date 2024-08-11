"use client"
import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function AddEstablishment() {
  const [open, setOpen] = useState(false);
  return <>
    <Chip
      label="Add Establishment"
      onClick={()=>{setOpen(true)}}
      variant="outlined"
      icon={<AddIcon />}
    />

  </>
}
