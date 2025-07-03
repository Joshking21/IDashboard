import { create } from "zustand"

const useAuthStore = create((set)=> ({
    user: null,
    setUser: (user)=> set({user}),
    loading: true,
    setLoading: (state)=> set({loading:state}),
}))

export default useAuthStore