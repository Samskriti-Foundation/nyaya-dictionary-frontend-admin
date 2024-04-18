import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

export interface TExample {
  id: number
  example_sentence: string
  applicable_modern_context: string
  sanskrit_word_id: number
  meaning_id: number
}

export const getWordExamples = async (word: string, meaning_id: number) => {
  const response = await api.get(`/words/${word}/${meaning_id}/examples`)
  return response.data
}

export const useGetWordExamplesQuery = (word: string, meaning_id: number) => {
  return useQuery<TExample[]>({
    queryKey: ["words", word, meaning_id, "examples"],
    queryFn: () => getWordExamples(word, meaning_id),
  })
}

export const getWordExample = async (
  word: string,
  meaning_id: number,
  example_id: number
) => {
  const response = await api.get(
    `/words/${word}/${meaning_id}/examples/${example_id}`
  )
  return response.data
}

export const useGetWordExampleQuery = (
  word: string,
  meaning_id: number,
  example_id: number
) => {
  return useQuery<TExample>({
    queryKey: ["words", word, meaning_id, "examples", example_id],
    queryFn: () => getWordExample(word, meaning_id, example_id),
  })
}

export const createWordExample = async (
  word: string,
  meaning_id: number,
  example_sentence: string,
  applicable_modern_context: string
) => {
  const response = await api.post(`/words/${word}/${meaning_id}/examples`, {
    example_sentence,
    applicable_modern_context,
  })
  return response.data
}

export const useCreateWordExampleMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      example_sentence,
      applicable_modern_context,
    }: {
      example_sentence: string
      applicable_modern_context: string
    }) =>
      createWordExample(
        word,
        meaning_id,
        example_sentence,
        applicable_modern_context
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "examples"],
      })
    },
  })
}

export const updateWordExample = async (
  word: string,
  meaning_id: number,
  example_id: number,
  example_sentence: string,
  applicable_modern_context: string
) => {
  const response = await api.put(
    `/words/${word}/${meaning_id}/examples/${example_id}`,
    {
      example_sentence,
      applicable_modern_context,
    }
  )
  return response.data
}

export const useUpdateWordExampleMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      example_id,
      example_sentence,
      applicable_modern_context,
    }: {
      example_id: number
      example_sentence: string
      applicable_modern_context: string
    }) =>
      updateWordExample(
        word,
        meaning_id,
        example_id,
        example_sentence,
        applicable_modern_context
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "examples"],
      })
    },
  })
}

export const deleteWordExample = async (
  word: string,
  meaning_id: number,
  example_id: number
) => {
  const response = await api.delete(
    `/words/${word}/${meaning_id}/examples/${example_id}`
  )
  return response.data
}

export const useDeleteWordExampleMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ example_id }: { example_id: number }) =>
      deleteWordExample(word, meaning_id, example_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "examples"],
      })
    },
  })
}

export const deleteWordExamples = async (word: string, meaning_id: number) => {
  const response = await api.delete(`/words/${word}/${meaning_id}/examples`)
  return response.data
}

export const useDeleteWordExamplesMutation = (
  word: string,
  meaning_id: number
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ meaning_id }: { meaning_id: number }) =>
      deleteWordExamples(word, meaning_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", word, meaning_id, "examples"],
      })
    },
  })
}
