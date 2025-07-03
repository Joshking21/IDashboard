
import useAuthStore from '@/stores/useAuth'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Auth({children}) {
    const user = useAuthStore((state)=> state.user)
    if(!user) return <Navigate to={"/sign-in"} replace={true} />
    return (
       { children }
    )
}
