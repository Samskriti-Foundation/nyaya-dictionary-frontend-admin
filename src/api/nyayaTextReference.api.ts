import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

export interface TNyayaTextReference {
  id: number
  meaning_id: number
  sanskrit_word_id: number
  source: string
  description: string
}

export const getWordNyayaTextReferences = async (
  word: string,
  meaning_id: number
) => {
  const response = await api.get(
    `words/${word}/${meaning_id}/nyaya_text_references`
  )
  return response.data
}

export const useGetWordNyayaTextReferencesQuery = (
  word: string,
  meaning_id: number
) => {
  return useQuery<TNyayaTextReference[]>({
    queryKey: ["words", word, meaning_id, "nyaya_text_references"],
    queryFn: () => getWordNyayaTextReferences(word, meaning_id),
  })
}

export const createWordNyayaTextReference = async (
  word: string,
  meaning_id: number,
  source: string,
  description: string
) => {
  const response = await api.post(
    `words/${word}/${meaning_id}/nyaya_text_references`,
    {
      source,
      description,
    }
  )
  return response.data
}

export const useCreateWordNyayaTextReferenceMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      source,
      description,
    }: {
      source: string
      description: string
    }) => createWordNyayaTextReference(word, meaning_id, source, description),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "nyaya_text_references"],
      })
    },
  })
}

export const updateWordNyayaTextReference = async (
  word: string,
  meaning_id: number,
  nyaya_text_id: number,
  source: string,
  description: string
) => {
  const response = await api.put(
    `words/${word}/${meaning_id}/nyaya_text_references/${nyaya_text_id}`,
    {
      source,
      description,
    }
  )
  return response.data
}

export const useUpdateWordNyayaTextReferenceMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      nyaya_text_id,
      source,
      description,
    }: {
      nyaya_text_id: number
      source: string
      description: string
    }) =>
      updateWordNyayaTextReference(
        word,
        meaning_id,
        nyaya_text_id,
        source,
        description
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "nyaya_text_references"],
      })
    },
  })
}

export const deleteWordNyayaTextReference = async (
  word: string,
  meaning_id: number,
  nyaya_text_id: number
) => {
  const response = await api.delete(
    `words/${word}/${meaning_id}/nyaya_text_references/${nyaya_text_id}`
  )
  return response.data
}

export const useDeleteWordNyayaTextReferenceMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ nyaya_text_id }: { nyaya_text_id: number }) =>
      deleteWordNyayaTextReference(word, meaning_id, nyaya_text_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "nyaya_text_references"],
      })
    },
  })
}

export const deleteWordNyayaTextReferences = async (
  word: string,
  meaning_id: number
) => {
  const response = await api.delete(
    `words/${word}/${meaning_id}/nyaya_text_references`
  )
  return response.data
}

export const useDeleteWordNyayaTextReferencesMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ meaning_id }: { meaning_id: number }) =>
      deleteWordNyayaTextReferences(word, meaning_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "nyaya_text_references"],
      })
    },
  })
}
