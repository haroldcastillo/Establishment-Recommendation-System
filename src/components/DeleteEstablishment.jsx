"use client"
import { MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useDispatch,useSelector } from 'react-redux';
import { deleteEstablishment } from '@/store/actions/establishments';
import { useRouter } from 'next/navigation';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 3,
};
export default function DeleteEstablishment({id}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const establishment = useSelector(state => state.establishments?.delete)
  const [open, setOpen] = React.useState(false);

  useEffect(()=>{
    if(establishment.data?._id){
      router.push('/establishment/my-list')
    }
  }
  ,[establishment])
  return (
    <>
      <MenuItem onClick={()=>{
        setOpen(true)
      }}>
        <p className='font-bold opacity-70 text-[12px]'>Delete</p>
      </MenuItem>
      <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete?
          </Typography>
          <hr className='mt-2'/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
          <div className='grid gap-4 mt-8' style={{gridTemplateColumns:".4fr 1fr"}}>
            <Button  onClick={()=>{setOpen(false)}}>Cancel</Button>
            <Button variant='contained' onClick={()=>{
              dispatch(deleteEstablishment(id))
            }}>Delete</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
