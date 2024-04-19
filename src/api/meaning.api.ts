import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
type TMeaning = {
  id: number
  meaning: string
}

export const getWordMeanings = async (word: string) => {
  const response = await api.get(`/words/${word}/meanings`)
  return response.data
}

export const useGetWordMeaningsQuery = (word: string) => {
  return useQuery<TMeaning[]>({
    queryKey: ["words", word, "meanings"],
    queryFn: () => getWordMeanings(word),
  })
}

export const getWordMeaning = async (word: string, meaning_id: number) => {
  const response = await api.get(`/words/${word}/meanings/${meaning_id}`)
  return response.data
}

export const useGetWordMeaningQuery = (word: string, meaning_id: number) => {
  return useQuery<TMeaning>({
    queryKey: ["words", word, "meanings", meaning_id],
    queryFn: () => getWordMeaning(word, meaning_id),
  })
}

export const createWordMeaning = async (word: string, meaning: string) => {
  const response = await api.post(`/words/${word}/meanings`, { meaning })
  return response.data
}

export const useCreateWordMeaningMutation = (word: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ word, meaning }: { word: string; meaning: string }) =>
      createWordMeaning(word, meaning),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words", word] })
    },
  })
}

export const updateWordMeaning = async ({
  word,
  meaning_id,
  meaning,
}: {
  word: string
  meaning_id: number
  meaning: string
}) => {
  const response = await api.put(`/words/${word}/meanings/${meaning_id}`, {
    meaning,
  })
  return response.data
}

export const useUpdateWordMeaningMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ meaning }: { meaning: string }) =>
      updateWordMeaning({ word, meaning_id, meaning }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words", word] })
    },
  })
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

export const useDeleteWordMeaningMutation = (word: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ word, meaning_id }: { word: string; meaning_id: number }) =>
      deleteWordMeaning({ word, meaning_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words", word] })
    },
  })
}

export const deleteWordAllMeanings = async (word: string) => {
  const response = await api.delete(`/words/${word}/meanings`)
  return response.data
}
