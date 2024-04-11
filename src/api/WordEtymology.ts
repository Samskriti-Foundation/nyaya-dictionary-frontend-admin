import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
      Accept: "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
  },
})

export const getWordEtymologies = async(word: string, meaning_id: number) => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/words/${word}/${meaning_id}/etymologies`)
  return response.data
}


export const deleteWordEtymologies = async(word: string, meaning_id: number) => {
  const response = await api.delete(`${import.meta.env.VITE_API_URL}/words/${word}/${meaning_id}/etymologies`)
  return response.data
}


export const getWordEtymology = async(word: string, meaning_id: number, etymology_id: number) => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/words/${word}/${meaning_id}/etymologies/${etymology_id}`)
  return response.data
}


export const addWordEtymology = async(word: string, meaning_id: number, etymology: string) => {
  const response = await api.post(`${import.meta.env.VITE_API_URL}/words/${word}/${meaning_id}/etymologies`, {etymology})
  return response.data
}


export const updateWordEtymology = async(word: string, meaning_id: number, etymology_id: number, etymology: string) => {
  const response = await api.put(`${import.meta.env.VITE_API_URL}/words/${word}/${meaning_id}/etymologies/${etymology_id}`, {etymology})
  return response.data
}


export const deleteWordEtymology = async(word: string, meaning_id: number, etymology_id: number) => {
  const response = await api.delete(`${import.meta.env.VITE_API_URL}/words/${word}/${meaning_id}/etymologies/${etymology_id}`)
  return response.data
}