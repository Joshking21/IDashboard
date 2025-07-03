import { baseUrl } from "@/constants/urls"
import { sendHttp } from "@/utils/sendHttp"
import { useMutation } from "@tanstack/react-query"


async function loginAdmin({email, password, rememberMe}){
    try{
        const URL = `${baseUrl}/admin`
        const method = "POST"
        const body = {email, password, rememberMe}
        const response = await sendHttp(method, URL, null, body)
        return response
    }catch(error){
        throw error
    }
}

export default function useLogin() {
  return useMutation({
    mutationFn: loginAdmin
  })
}
