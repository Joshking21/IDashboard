import { baseUrl } from '@/constants/urls'
import { sendHttp } from '@/utils/sendHttp'
import { useMutation } from '@tanstack/react-query'

async function getPaid(requestId) {
  try {
    const url = `${baseUrl}/admin/users/transactions/agent/request?requestId=${requestId}`
    const method = "POST"
    const token = localStorage.getItem("accessToken")
    const data = await sendHttp(method, url, token)
    return data.data
  } catch (error) {
    throw error
  }
}

export default function useGetPaid() {
  return useMutation({
    mutationFn: (requestId) => getPaid(requestId), // requestId comes from mutate
    onSuccess: (data) => {
      console.log("Payment successful:", data)
      queryClient.invalidateQueries({ queryKey: ["summaryTransactionsDetails"] })
    },
    onError: (error) => {
      console.error("Payment failed:", error)
    },
  })
}
