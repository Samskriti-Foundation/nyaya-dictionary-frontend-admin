import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/theme.ts'
import { Global, css } from '@emotion/react'

import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()

const GlobalStyles = css`
    /*
      This will hide the focus indicator if the element receives focus    via the mouse,
      but it will still show up on keyboard focus.
    */
    .js-focus-visible :focus:not([data-focus-visible-added]) {
      outline: none;
      box-shadow: none;
    }
  `;

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <App />
          <ReactQueryDevtools initialIsOpen/>
        </QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
