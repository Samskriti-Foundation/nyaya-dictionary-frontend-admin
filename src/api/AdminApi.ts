import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token"),
  },
})


export const getAdmins = async () => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/admins`)
  return response.data
}

export const updateAdmin = async ({email, data} : {email: string, data: {email: string, first_name: string, last_name: string}}) => {
  const response = await api.put(`${import.meta.env.VITE_API_URL}/admins/${email}`, {
    ...data
  })
  return response.data
}