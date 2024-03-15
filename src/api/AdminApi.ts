import axios from "axios"

export const getAdmins = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/admins`, {
      withCredentials: true,
  })
  return response.data
}