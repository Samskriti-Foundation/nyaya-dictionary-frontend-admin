import { ReactNode, createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useLoginDBManagerQuery } from "../api/login.api"
import useSuccessToast from "../hooks/useSuccessToast"
import useErrorToast from "../hooks/useErrorToast"

export interface AuthContextValue {
  token: string | null
  role: string | null
  access: string | null
  login: (params: {
    email: string
    password: string
    setIsLoading: (isLoading: boolean) => void
  }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  token: null,
  role: null,
  access: null,
  login: () => {},
  logout: () => {},
})
export default AuthContext

interface AuthProviderProps {
  children: ReactNode
}

interface DecodedToken {
  email: string
  role: string
  access: string
  exp: number
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  )
  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role") || null
  )
  const [access, setAccess] = useState<string | null>(
    localStorage.getItem("access") || null
  )

  const navigate = useNavigate()
  const successToast = useSuccessToast()
  const errorToast = useErrorToast()
  const loginMutation = useLoginDBManagerQuery()

  useEffect(() => {
    localStorage.setItem("token", token || "")
    localStorage.setItem("role", role || "")
    localStorage.setItem("access", access || "")
  }, [token, role, access])

  const login = ({
    email,
    password,
    setIsLoading,
  }: {
    email: string
    password: string
    setIsLoading: (isLoading: boolean) => void
  }) => {
    loginMutation.mutate(
      { username: email, password },
      {
        onSuccess: (data: { access_token: string; token_type: string }) => {
          const decodedToken: DecodedToken = jwtDecode(data.access_token)
          setToken(data.access_token)
          setRole(decodedToken.role)
          setAccess(decodedToken.access)
          navigate("/words")
          successToast("Login successful!", "top")
          setIsLoading(false)
        },
        onError: (error) => {
          errorToast(error, "top")
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
