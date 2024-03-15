import axios from "axios"

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
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