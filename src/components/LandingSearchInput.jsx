"use client"
import React,{useEffect, useState} from 'react'
import SearchInput from './SearchInput'
import { useDispatch,useSelector} from 'react-redux'
import { setSearchValue } from '@/store/actions/establishments'
export default function LandingSearchInput() {
  const searchValue = useSelector(state => state.establishments.utils.search)
  const dispatch = useDispatch()
  const [search, setSearch] = useState(searchValue||"")

  useEffect(()=>{
    dispatch(setSearchValue(search))
  },[search])
  return (
    <div>
      <SearchInput value={search} setValue={setSearch} />
    </div>
  )
}
