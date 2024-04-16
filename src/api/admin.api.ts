import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

export const getAdmins = async () => {
  const response = await api.get(`/admins`)
  return response.data
}

type Admin = {
  first_name: string
  last_name: string
  email: string
  is_superuser: boolean
}

export const updateAdmin = async ({ data }: { data: Admin }) => {
  const response = await api.put(`/admins/`, {
    ...data,
  })
  return response.data
}
