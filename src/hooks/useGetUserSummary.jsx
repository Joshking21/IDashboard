import { baseUrl } from '@/constants/urls'
import { sendHttp } from '@/utils/sendHttp'
import { useQuery } from '@tanstack/react-query'

async function getUserSummary(){
    try{
        const url= `${baseUrl}/admin/summary/users`
        const method = "GET"
        const token = localStorage.getItem("accessToken")
        const data = await sendHttp(method, url, token)
        return data.data
    }catch(error){
        throw error
    }
}

export default function useGetUserSummary() {
    return useQuery({
        queryKey: ["user-summary"],
        queryFn: getUserSummary
    })
}
