import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

export interface TWord {
  id: number
  sanskrit_word: string
  english_transliteration: string
  meaning_ids: [number]
}

export const getWords = async () => {
  const response = await api.get(`/words`)
  return response.data
}

export const useGetWordsQuery = () => {
  return useQuery<TWord[]>({
    queryKey: ["words"],
    queryFn: getWords,
  })
}

export const getWord = async (word: string) => {
  const response = await api.get(`/words/${word}`)
  return response.data
}

export const useGetWordQuery = (word: string) => {
  return useQuery<TWord>({
    queryKey: ["words", word],
    queryFn: () => getWord(word),
  })
}

export const createWord = async ({
  sanskrit_word,
  english_transliteration,
}: {
  sanskrit_word: string
  english_transliteration: string
}) => {
  const response = await api.post(`/words`, {
    sanskrit_word,
    english_transliteration,
  })
  return response.data
}

export const useCreateWordMutation = () => {
  const queryclient = useQueryClient()

  return useMutation({
    mutationFn: createWord,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["words"] })
    },
  })
}

export const updateWord = async (
  word: string,
  english_transliteration: string
) => {
  const response = await api.put(`/words/${word}`, {
    sanskrit_word: word,
    english_transliteration,
  })
  return response.data
}

export const useUpdateWordMutation = (word: string) => {
  const queryclient = useQueryClient()

  return useMutation({
    mutationFn: ({
      word,
      english_transliteration,
    }: {
      word: string
      english_transliteration: string
    }) => updateWord(word, english_transliteration),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["words", word] })
    },
  })
}

export const deleteWord = async (word: string) => {
  const response = await api.delete(`/words/${word}`)
  return response.data
}

export const useDeleteWordMutation = () => {
  const queryclient = useQueryClient()

  return useMutation({
    mutationFn: (word: string) => deleteWord(word),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["words"] })
    },
  })
}
