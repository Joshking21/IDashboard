import useAuthStore from '@/stores/useAuth'
import { fetchUserData } from '@/utils/fetchUser'
import { useEffect } from 'react'

function useCheckLoggedin() {
    const { setUser, setLoading } = useAuthStore()

    useEffect(()=>{
        setLoading(true)
        const getUser = async ()=> {
            const user = await fetchUserData()
            if(user){
                setUser(user)
                console.log("user:", user)
                  const token = localStorage.getItem("accessToken");
                  console.log(token)
            }else{
                setUser(null)
            }
            setLoading(false)
        }
        getUser()
    }, [])
}

export default useCheckLoggedin