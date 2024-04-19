import { Navigate, Outlet } from "react-router-dom"

function PrivateRoutes() {
  const user = localStorage.getItem("token") ?? null

  return user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
