import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoutes from './utils/PrivateRoutes'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ManagementPage from './pages/Management/ManagementPage'

function App() {
  return (
    <Box h = "full">
      <Routes>
        <Route path = "/" element = {<LoginPage />}/>
        <Route element = {<PrivateRoutes />}>
          <Route path = "/dictionary" element = {<DashboardPage />}/>
          <Route path = "/management" element = {<ManagementPage />}/>
        </Route>
      </Routes>
    </Box>
  )
}

export default App
