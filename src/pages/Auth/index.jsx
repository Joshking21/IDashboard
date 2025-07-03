
import useAuthStore from '@/stores/useAuth'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Auth({children}) {
    const user = useAuthStore((state)=> state.user)
    const loading = useAuthStore((state)=> state.loading)
    if(loading) return <p>Loading...</p>
    if(!user && !loading) return <Navigate to={"/sign-in"} replace={true} />
    return children
}
