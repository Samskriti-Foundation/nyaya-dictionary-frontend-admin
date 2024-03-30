import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
  },
})


export const getWords = async () => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/words`)
  return response.data
}