import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

interface TAntonym {
  id: number
  sanskrit_word_id: number
  meaning_id: number
  antonym: string
}

export const getWordAntonyms = async (word: string, meaning_id: number) => {
  const response = await api.get(`/words/${word}/${meaning_id}/antonyms`)
  return response.data
}

export const useGetWordAntonymsQuery = (word: string, meaning_id: number) => {
  return useQuery<TAntonym[]>({
    queryKey: ["words", word, meaning_id, "antonyms"],
    queryFn: () => getWordAntonyms(word, meaning_id),
  })
}

export const getWordAntonym = async (
  word: string,
  meaning_id: number,
  antonym_id: number
) => {
  const response = await api.get(
    `/words/${word}/${meaning_id}/antonyms/${antonym_id}`
  )
  return response.data
}

export const createWordAntonym = async (
  word: string,
  meaning_id: number,
  antonym: string
) => {
  const response = await api.post(`/words/${word}/${meaning_id}/antonyms`, {
    antonym,
  })
  return response.data
}

export const useCreateWordAntonymMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ antonym }: { antonym: string }) =>
      createWordAntonym(word, meaning_id, antonym),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "antonyms"],
      })
    },
  })
}

export const updateWordAntonym = async (
  word: string,
  meaning_id: number,
  antonym_id: number,
  antonym: string
) => {
  const response = await api.put(
    `/words/${word}/${meaning_id}/antonyms/${antonym_id}`,
    {
      antonym,
    }
  )
  return response.data
}

export const useUpdateWordAntonymMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      antonym_id,
      antonym,
    }: {
      antonym_id: number
      antonym: string
    }) => updateWordAntonym(word, meaning_id, antonym_id, antonym),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "antonyms"],
      })
    },
  })
}

export const deleteWordAntonym = async (
  word: string,
  meaning_id: number,
  antonym_id: number
) => {
  const response = await api.delete(
    `/words/${word}/${meaning_id}/antonyms/${antonym_id}`
  )
  return response.data
}

export const useDeleteWordAntonymMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ antonym_id }: { antonym_id: number }) =>
      deleteWordAntonym(word, meaning_id, antonym_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "antonyms"],
      })
    },
  })
}

export const deleteWordAntonyms = async (word: string, meaning_id: number) => {
  const response = await api.delete(`/words/${word}/${meaning_id}/antonyms`)
  return response.data
}

export const useDeleteWordAntonymsMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ meaning_id }: { meaning_id: number }) =>
      deleteWordAntonyms(word, meaning_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "antonyms"],
      })
    },
  })
}
