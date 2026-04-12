import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeContext'
import { store } from './redux/store'
 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> 
    <ThemeProvider>
      <BrowserRouter>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
