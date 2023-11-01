import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Update from './Update.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    // loader: () => fetch('http://localhost:3000/users')
  },
  {
    path: "/user/:id",
    element: <Update></Update>,
    loader: ({ params }) => fetch(`http://localhost:3000/user/${params.id}`)
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
