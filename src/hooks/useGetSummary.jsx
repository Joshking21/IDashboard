import { baseUrl } from "@/constants/urls"
import { sendHttp } from "@/utils/sendHttp"
import { useQuery } from "@tanstack/react-query"

async function getSummary(){
    try{
        const method = "GET"
        const URL = `${baseUrl}/admin/summary`
        const token = localStorage.getItem("accessToken")
        const data = await sendHttp(method, URL, token)
        return data.data
    }catch(err){
        throw err
    }
}

export default function useGetSummary() {
    return useQuery({
        queryKey: ["summary"],
        queryFn: getSummary
    })
}
