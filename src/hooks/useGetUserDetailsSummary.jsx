import { baseUrl } from '@/constants/urls'
import { sendHttp } from '@/utils/sendHttp'
import { useQuery } from '@tanstack/react-query'

async function getUserDetails(userId){
    try{
        const url= `${baseUrl}/admin/users/${userId}`
        const method = "GET"
        const token = localStorage.getItem("accessToken")
        const data = await sendHttp(method, url, token)
        return data.data
    }catch(error){
        throw error
    }
}

export default function useGetUserDetails(userId) {
    return useQuery({
        queryKey: ["user-details",userId],
         queryFn: () => getUserDetails(userId),
          enabled: !!userId
    })
}
