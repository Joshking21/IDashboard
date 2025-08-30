import { create } from "zustand"

const useUserID = create((set)=> ({
    userId: "",
    setUserId: (userId)=> set({userId})
}))

export default useUserID