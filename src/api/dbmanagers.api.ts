import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
  const response = await api.get("/db-managers")
  return response.data
}

export const useGetDBManagersQuery = () => {
  return useQuery<TDBManager[]>({
    queryKey: ["dbmanagers"],
    queryFn: getDBManagers,
  })
}

export const createDBManager = async ({
  first_name,
  last_name,
  email,
  role,
  access,
  password,
}: {
  first_name: string
  last_name: string
  email: string
  role: string
  access: string
  password: string
}) => {
  const response = await api.post("/auth/register", {
    first_name,
    last_name,
    email,
    role,
    access,
    password,
  })
  return response.data
}

export const useCreateDBManagerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createDBManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dbmanagers"] })
    },
  })
}

export const updateDBManager = async (data: TDBManager) => {
  const response = await api.put(`/db-managers/${data.email}`, data)
  return response.data
}

export const useUpdateDBManagerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateDBManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dbmanagers"] })
    },
  })
}

export const deleteDBManager = async (email: string) => {
  const response = await api.delete(`/db-managers/${email}`)
  return response.data
}

export const useDeleteDBManagerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ email }: { email: string }) => deleteDBManager(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dbmanagers"] })
    },
  })
}
