import { jwtDecode } from "jwt-decode";

type User = {
  email: string
  token: string
  token_expire: number
}

export const getCurrentUser = () : User | null => {
  let token = localStorage.getItem('token')
  
  if (!token){
    return null
  }
  
  const decoded: {email: string, exp: number} = jwtDecode(token)

  const user : User = {
    email: decoded.email,
    token: token,
    token_expire: decoded.exp
  }

  return user
}