import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

import { ChakraProvider } from "@chakra-ui/react"
import theme, { GlobalStyles } from "./utils/theme.ts"
import { Global } from "@emotion/react"

import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AuthProvider } from "./context/AuthContext.tsx"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <BrowserRouter basename="/nyaya-admin">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
            {/* <ReactQueryDevtools initialIsOpen /> */}
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
