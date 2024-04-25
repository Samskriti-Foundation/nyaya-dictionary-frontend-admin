import { ToastPosition, useToast } from "@chakra-ui/react"

const useSuccessToast = () => {
  const toast = useToast()

  const showToast = (
    title: string,
    position: ToastPosition = "bottom",
    duration = 3000,
    isClosable = true
  ) => {
    toast({
      title: title,
      status: "success",
      position: position,
      duration: duration,
      isClosable: isClosable,
    })
  }

  return showToast
}

export default useSuccessToast
