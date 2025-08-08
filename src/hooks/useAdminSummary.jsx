import { baseUrl } from "@/constants/urls"
import { sendHttp } from "@/utils/sendHttp"
import { useQuery } from "@tanstack/react-query"

async function getFinanceSummary(){
    try{
        const method = "GET"
        const URL = `${baseUrl}/admin/summary/transactions`
        const token = localStorage.getItem("accessToken")
        const data = await sendHttp(method, URL, token)
        return data.data
    }catch(err){
        throw err
    }
}

export default function useGetFinanceSummary() {
    return useQuery({
        queryKey: ["summaryTransactions"],
        queryFn: getFinanceSummary
    })
}
