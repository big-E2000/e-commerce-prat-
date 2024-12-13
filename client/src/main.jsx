import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store} >
      <RouterProvider router = {router} /> 
    </Provider>
  </StrictMode>,
)
