import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../context/AuthContext"

function PrivateRoutes() {
  const { token } = useContext(AuthContext)

  return token ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
