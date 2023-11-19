import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// extending the theme
const colors = {
  brand: {
    900: '#0A2240',
    600: '#004B98',
    300: '#3DB5E6',
    grey: '#C8C8C8',
    green: '#1E5C3A',
    red: '#E1261C',
  },
}
const fonts = {
  body: 'Tahoma',
  heading: 'Courier New'
}

const theme = extendTheme({ colors, fonts })

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
)