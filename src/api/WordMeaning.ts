import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
  },
})


export const getWordMeanings = async(word: string | undefined) => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/words/${word}/meanings`)
  return response.data
}


export const getWordMeaning = async({word, meaning_id} : {word: string | undefined, meaning_id: number}) => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/words/${word}/meanings/${meaning_id}`)
  return response.data
}


export const createWordMeaning = async({word, meaning}:{word: string | undefined, meaning: string}) => {
  const response = await api.post(`${import.meta.env.VITE_API_URL}/words/${word}/meanings`, {
    meaning
  }, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  return response.data
}