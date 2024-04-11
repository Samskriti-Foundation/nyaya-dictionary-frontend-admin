import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
      Accept: "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
  },
})


export const getWordDerivations = async(word: string) => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/words/${word}/derivations`)
  return response.data
}


export const getWordDerivation = async(word: string, derivation_id: number) => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/words/${word}/derivations/${derivation_id}`)
  return response.data
}


export const createWordDerivation = async({word, derivation} : {word: string, derivation: string}) => {
  const response = await api.post(`${import.meta.env.VITE_API_URL}/words/${word}/derivations`, {derivation})
  return response.data
}


export const deleteWordDerivation = async({word, derivation_id} : {word: string, derivation_id: number}) => {
  const response = await api.delete(`${import.meta.env.VITE_API_URL}/words/${word}/derivations/${derivation_id}`)
  return response.data
}


export const deleteWordAllDerivations = async(word: string) => {
  const response = await api.delete(`${import.meta.env.VITE_API_URL}/words/${word}/derivations`)
  return response.data
}


export const updateWordDerivation = async({word, derivation_id, derivation} : {word: string, derivation_id: number, derivation: string}) => {
  const response = await api.put(`${import.meta.env.VITE_API_URL}/words/${word}/derivations/${derivation_id}`, {derivation})
  return response.data
}