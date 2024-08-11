"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function ProtectedRoutes({children}) {
  const router = useRouter()
  const auth = useSelector(state => state.auth?.utils)
  const check = useSelector(state => state.auth?.status)
  useEffect(()=>{
    if(!auth.accessToken && check?.isError){
      router.push('/')
    }
  },[auth, auth.accessToken, check.error])

  if(!auth.accessToken && check?.isError ){
    return null
  }
  if(auth?.isLoading){
    return <div>Loading...</div>
  }
  return (
    <div>
      {children}
    </div>
  )
}
