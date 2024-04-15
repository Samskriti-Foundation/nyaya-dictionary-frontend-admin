import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoutes from './utils/PrivateRoutes'
import LoginPage from './pages/LoginPage'
import WordsPage from './pages/WordsPage'
import SingleWordPage from './pages/SingleWordPage'
import ManagementPage from './pages/ManagementPage'

function App() {
  return (
    <Box h = "full">
      <Routes>
        <Route path = "/" element = {<LoginPage />}/>
        <Route element = {<PrivateRoutes />}>
          <Route path = "/words" element = {<WordsPage />}/>
          <Route path = "/words/:word" element = {<SingleWordPage />}/>
          <Route path = "/management/*" element = {<ManagementPage />}/>
        </Route>
      </Routes>
    </Box>
  )
}

export default App
