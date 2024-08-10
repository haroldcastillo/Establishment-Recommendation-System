"use client"
import React,{useState} from 'react'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ContactEmergency } from '@/lib/constants';
import SearchInput from '@/components/SearchInput';
import BaseLayout from '@/layout/baseLayout';
export default function Contact() {
  const [search, setSearch] = useState('')
  const filteredContacts = ContactEmergency.filter((row) => row.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <BaseLayout>
    <div className='max-w-screen-xl mx-auto pt-[70px] px-4'>
      <div className='mt-[2em]'>
        <SearchInput value={search} setValue={setSearch}/>
      </div>
      <div className='mt-6 mb-[4em]'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>CONTACT NUMBERS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.contactNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
      
    </BaseLayout>
  );
}
