import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoutes from './utils/PrivateRoutes'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

import axios from "axios"
axios.defaults.withCredentials = true;

function App() {
  return (
    <Box h = "full">
      <Routes>
        <Route path = "/" element = {<LoginPage />}/>
        <Route element = {<PrivateRoutes />}>
          <Route path = "/dashboard" element = {<DashboardPage />}/>
        </Route>
      </Routes>
    </Box>
  )
}

export default App
