import { baseUrl } from "@/constants/urls"

export async function fetchUserData(){
    const accessToken = localStorage.getItem("accessToken")
    if(!accessToken) return null
    try{
        const resp = await fetch(`${baseUrl}/admin`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })

        if(!resp.ok){
            throw new Error("Token might be expired")
            //apply refresh
        }
        const data = await resp.json()
        return data.data
    }catch(error){
        console.error('Failed to fetch user:',error)
        return null
    }
}