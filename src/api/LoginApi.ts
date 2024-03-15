import axios from "axios"

export const loginUser = async ({email, password}: {email: string, password: string}) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
    username: email,
    password
  },{
    headers : {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  return response.data
}