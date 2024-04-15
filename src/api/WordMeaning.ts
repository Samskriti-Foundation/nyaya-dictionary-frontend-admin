import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

export const getWordMeanings = async (word: string) => {
  const response = await api.get(`/words/${word}/meanings`)
  return response.data
}

export const getWordMeaning = async (word: string, meaning_id: number) => {
  const response = await api.get(`/words/${word}/meanings/${meaning_id}`)
  return response.data
}

export const createWordMeaning = async (word: string, meaning: string) => {
  const response = await api.post(`/words/${word}/meanings`, { meaning })
  return response.data
}

export const deleteWordMeaning = async ({
  word,
  meaning_id,
}: {
  word: string
  meaning_id: number
}) => {
  const response = await api.delete(`/words/${word}/meanings/${meaning_id}`)
  return response.data
}

export const deleteWordAllMeanings = async (word: string) => {
  const response = await api.delete(`/words/${word}/meanings`)
  return response.data
}
