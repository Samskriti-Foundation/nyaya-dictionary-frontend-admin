import { ToastPosition, useToast } from "@chakra-ui/react"
import { isAxiosError } from "axios"

const useErrorToast = () => {
  const toast = useToast()

  const showToast = (
    error: Error,
    position: ToastPosition = "bottom",
    duration = 3000,
    isClosable = true
  ) => {
    if (isAxiosError(error)) {
      toast({
        title: error.response?.data
          ? `Error: ${Object.entries(error.response?.data)[0][1]}`
          : `Error: ${error.message}`,
        status: "error",
        position: position,
        duration: duration,
        isClosable: isClosable,
      })
    } else {
      toast({
        title: error.message,
        status: "error",
        position: position,
        duration: duration,
        isClosable: isClosable,
      })
    }
  }

  return showToast
}

export default useErrorToast
