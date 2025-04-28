import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Authentication, PageType } from './pages/Authentication.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CookiesProvider } from 'react-cookie';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Authentication pageType={PageType.Login}/>,
  },
  {
    path: "/register",
    element: <Authentication pageType={PageType.Register} />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <RouterProvider router={router} />
      <ToastContainer />
    </CookiesProvider>
  </StrictMode>
)
