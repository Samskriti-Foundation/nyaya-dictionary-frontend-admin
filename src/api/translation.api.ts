import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
})

export interface TTranslation {
  id: number
  sanskrit_word_id: number
  translation: string
}

export const getWordTranslations = async (word: string, meaning_id: number) => {
  const response = await api.get(`/words/${word}/${meaning_id}/translations`)
  return response.data
}

export const useGetWordTranslationsQuery = (
  word: string,
  meaning_id: number
) => {
  return useQuery<TTranslation[]>({
    queryKey: ["words", word, meaning_id, "translations"],
    queryFn: () => getWordTranslations(word, meaning_id),
  })
}

export const createWordTranslation = async (
  word: string,
  meaning_id: number,
  language: string,
  translation: string
) => {
  const response = await api.post(`/words/${word}/${meaning_id}/translations`, {
    language,
    translation,
  })
  return response.data
}

export const useCreateWordTranslationMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      language,
      translation,
    }: {
      language: string
      translation: string
    }) => createWordTranslation(word, meaning_id, language, translation),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "translations"],
      })
    },
  })
}

export const deleteWordTranslations = async (
  word: string,
  meaning_id: number
) => {
  const response = await api.delete(`/words/${word}/${meaning_id}/translations`)
  return response.data
}

export const useDeleteWordTranslationsMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteWordTranslations(word, meaning_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "translations"],
      })
    },
  })
}
