import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
      Accept: "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
  },
})


export const getWords = async () => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/words`)
  return response.data
}

export const getWord = async(word: string | undefined) => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}/words/${word}`)
  return response.data
}

export const createWord = async({sanskrit_word, english_transliteration}: {sanskrit_word: string, english_transliteration: string}) => {
  const response = await api.post(`${import.meta.env.VITE_API_URL}/words`, {
    sanskrit_word,
    english_transliteration
  })
  return response.data
}

export const editWord = async({word, english_transliteration}: {word: string, english_transliteration: string}) => {
  const response = await api.put(`${import.meta.env.VITE_API_URL}/words/${word}`, {
    sanskrit_word: word,
    english_transliteration
  })
  return response.data
}

export const deleteWord = async(word: string) => {
  const response = await api.delete(`${import.meta.env.VITE_API_URL}/words/${word}`)
  return response.data
}