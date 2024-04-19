import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

type TDBManager = {
  first_name: string
  last_name: string
  email: string
  role: string
  access: string
}

export const getDBManagers = async () => {
  const response = await api.get(`/d`)
  return response.data
}

export const useGetDBManagersQuery = () => {
  return useQuery<TDBManager[]>({
    queryKey: ["dbmanagers"],
    queryFn: getDBManagers,
  })
}
