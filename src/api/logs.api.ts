import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

type TDBLog = {
  timestamp: string
  table_name: string
  record_id: number
  operation: "CREATE" | "UPDATE" | "DELETE" | "DELETE_ALL"
  db_manager_email: string
  affected_value: string
}

type TAuthLog = {
  timestamp: string
  client_ip: string
  db_manager_email: string
}

export const getDBLogs = async (month: string | null) => {
  const response = await api.get(`/logs/db-ops/${month}`)
  return response.data
}

export const useGetDBLogsQuery = (month: string | null) => {
  return useQuery<TDBLog[]>({
    queryKey: ["logs", month],
    queryFn: () => getDBLogs(month),
  })
}

export const getAuthLogs = async () => {
  const response = await api.get("/logs/login-audits")
  return response.data
}

export const useGetAuthLogsQuery = () => {
  return useQuery<TAuthLog[]>({
    queryKey: ["logs", "auth-logs"],
    queryFn: () => getAuthLogs(),
  })
}
