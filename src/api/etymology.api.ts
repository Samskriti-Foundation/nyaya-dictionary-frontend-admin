import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

interface TEtymology {
  id: number
  sanskrit_word_id: number
  meaning_id: number
  etymology: string
}

export const getWordEtymologies = async (word: string, meaning_id: number) => {
  const response = await api.get(`/words/${word}/${meaning_id}/etymologies`)
  return response.data
}

export const useGetWordEtymologiesQuery = (
  word: string,
  meaning_id: number
) => {
  return useQuery<TEtymology[]>({
    queryKey: ["words", word, meaning_id, "etymologies"],
    queryFn: () => getWordEtymologies(word, meaning_id),
  })
}

export const getWordEtymology = async (
  word: string,
  meaning_id: number,
  etymology_id: number
) => {
  const response = await api.get(
    `/words/${word}/${meaning_id}/etymologies/${etymology_id}`
  )
  return response.data
}

export const createWordEtymology = async (
  word: string,
  meaning_id: number,
  etymology: string
) => {
  const response = await api.post(`/words/${word}/${meaning_id}/etymologies`, {
    etymology,
  })
  return response.data
}

export const useCreateWordEtymologyMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ etymology }: { etymology: string }) =>
      createWordEtymology(word, meaning_id, etymology),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "etymologies"],
      })
    },
  })
}

export const updateWordEtymology = async (
  word: string,
  meaning_id: number,
  etymology_id: number,
  etymology: string
) => {
  const response = await api.put(
    `/words/${word}/${meaning_id}/etymologies/${etymology_id}`,
    { etymology }
  )
  return response.data
}

export const useUpdateWordEtymologyMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      etymology_id,
      etymology,
    }: {
      etymology_id: number
      etymology: string
    }) => updateWordEtymology(word, meaning_id, etymology_id, etymology),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "etymologies"],
      })
    },
  })
}

export const deleteWordEtymology = async (
  word: string,
  meaning_id: number,
  etymology_id: number
) => {
  const response = await api.delete(
    `/words/${word}/${meaning_id}/etymologies/${etymology_id}`
  )
  return response.data
}

export const useDeleteWordEtymologyMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ etymology_id }: { etymology_id: number }) =>
      deleteWordEtymology(word, meaning_id, etymology_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "etymologies"],
      })
    },
  })
}

export const deleteWordEtymologies = async (
  word: string,
  meaning_id: number
) => {
  const response = await api.delete(`/words/${word}/${meaning_id}/etymologies`)
  return response.data
}

export const useDeleteWordEtymologiesMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ meaning_id }: { meaning_id: number }) =>
      deleteWordEtymologies(word, meaning_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "etymologies"],
      })
    },
  })
}
