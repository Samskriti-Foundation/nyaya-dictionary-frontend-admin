import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

export interface TDerivation {
  id: number
  sanskrit_word_id: number
  meaning_id: number
  derivation: string
}

export const getWordDerivations = async (word: string, meaning_id: number) => {
  const response = await api.get(`/words/${word}/${meaning_id}/derivations`)
  return response.data
}

export const useGetWordDerivationsQuery = (
  word: string,
  meaning_id: number
) => {
  return useQuery<TDerivation[]>({
    queryKey: ["words", word, meaning_id, "derivations"],
    queryFn: () => getWordDerivations(word, meaning_id),
  })
}

export const getWordDerivation = async (
  word: string,
  meaning_id: number,
  derivation_id: number
) => {
  const response = await api.get(
    `/words/${word}/${meaning_id}derivations/${derivation_id}`
  )
  return response.data
}

export const createWordDerivation = async (
  word: string,
  meaning_id: number,
  derivation: string
) => {
  const response = await api.post(`/words/${word}/${meaning_id}/derivations`, {
    derivation,
  })
  return response.data
}

export const useCreateWordDerivationMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ derivation }: { derivation: string }) =>
      createWordDerivation(word, meaning_id, derivation),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "derivations"],
      })
    },
  })
}

export const updateWordDerivation = async (
  word: string,
  meaning_id: number,
  derivation_id: number,
  derivation: string
) => {
  const response = await api.put(
    `/words/${word}/${meaning_id}/derivations/${derivation_id}`,
    { derivation }
  )
  return response.data
}

export const useUpdateWordDerivationMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      derivation_id,
      derivation,
    }: {
      derivation_id: number
      derivation: string
    }) => updateWordDerivation(word, meaning_id, derivation_id, derivation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words", word] })
    },
  })
}

export const deleteWordDerivation = async (
  word: string,
  meaning_id: number,
  derivation_id: number
) => {
  const response = await api.delete(
    `/words/${word}/${meaning_id}/derivations/${derivation_id}`
  )
  return response.data
}

export const useDeleteWordDerivationMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ derivation_id }: { derivation_id: number }) =>
      deleteWordDerivation(word, meaning_id, derivation_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "derivations"],
      })
    },
  })
}

export const deleteWordAllDerivations = async (
  word: string,
  meaning_id: number
) => {
  const response = await api.delete(`/words/${word}/${meaning_id}/derivations`)
  return response.data
}

export const useDeleteWordDerivationsMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ meaning_id }: { meaning_id: number }) =>
      deleteWordAllDerivations(word, meaning_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "derivations"],
      })
    },
  })
}
