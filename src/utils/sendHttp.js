import useAuthStore from "@/stores/useAuth"

export async function sendHttp(method, url, token, body){
    const setUser = useAuthStore.getState().setUser
    try{
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        if (body !== undefined && body !== null && method !== "GET" && method !== "HEAD") {
            options.body = JSON.stringify(body)
        }

        const response = await fetch(url, options)

        if(!response.ok){
            const data = await response.json()
            if(response.status === 401){
                setUser(null)
            }
            throw new Error(data.message || "Something went wrong")
        }
        return await response.json()
    }catch(err){
        console.log(err)
        throw err
    }
}