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
import SearchInput from '@/app/components/SearchInput'

export default function Establisment({data}:{data:any}) {
  const [search, setSearch] = useState('')
  const filteredData = data.filter((row:any) => row.Name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <Container maxWidth="lg">
      <Container maxWidth="lg" className='pt-4'>
        <div className='mt-[2em]'>
          <SearchInput value={search} setValue={setSearch}/>
        </div>
        <div className='mt-6 mb-[4em]'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Establishments</TableCell>
                  <TableCell>Types</TableCell>
                  <TableCell>More Information</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row:any,index:number) => (
                  <TableRow key={row.index}>
                    <TableCell component="th" scope="row">
                      {row.Name}
                    </TableCell>
                    <TableCell align="left">{row.Type}</TableCell>
                    <TableCell align="left">
                      <p><span className='font-semibold'>Location: </span>{row.Location}</p>
                      <p><span className='font-semibold'>Contact Number:</span> {row.ContactNumber}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
      </Container>
    </div>
  )
}
