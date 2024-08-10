"use client"
import React,{useEffect, useState} from 'react'
import SearchInput from './SearchInput'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '@/store/actions/establishments'
export default function LandingSearchInput() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  useEffect(()=>{
    dispatch(setSearchValue(search))
  },[search])
  return (
    <div>
      <SearchInput value={search} setValue={setSearch} />
    </div>
  )
}
