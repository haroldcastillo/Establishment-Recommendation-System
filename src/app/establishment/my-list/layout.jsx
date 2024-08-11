import React from 'react'
import ProtectedRoutes from "@/lib/ProtectedRoutes"
export default function layout({children}) {
  return (
    <ProtectedRoutes>
      {children}
    </ProtectedRoutes>
  )
}
