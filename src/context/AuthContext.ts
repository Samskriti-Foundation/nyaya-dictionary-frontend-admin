import { ReactNode, createContext, useState } from "react"
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useLoginDBManagerQuery } from "../api/login.api"
import { useToast } from "@chakra-ui/react"

const AuthContext = createContext(null)

export default AuthContext

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)
  const [access, setAccess] = useState(null)

  const navigate = useNavigate()
  const toast = useToast()

  const loginMutation = useLoginDBManagerQuery()

  let login = async ({
    email,
    password,
    setIsLoading,
  }: {
    email: string
    password: string
    setIsLoading: (arg0: boolean) => void
  }) => {
    loginMutation.mutate(
      { username: email, password },
      {
        onSuccess: (data: { access_token: string; token_type: string }) => {
          navigate("/words")
          toast({
            position: "top",
            title: "Login successful",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          localStorage.setItem("token", data.access_token)
          setIsLoading(false)
        },
        onError: (error) => {
          toast({
            position: "top",
            title: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
          setIsLoading(false)
        },
      }
    )
  }

  const logout = () => {
    setToken(null)
    setRole(null)
    setAccess(null)
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("access")
    navigate("/")
  }

  const contextData = {
    token: token,
    role: role,
    access: access,
    login: login,
    logout: logout,
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}
