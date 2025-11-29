import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";
import Home from "./assets/Pages/Home";
import Register from "./assets/Pages/Register";
import Login from "./assets/Pages/Login";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import Single from "./assets/Pages/Single";
import Write from "./assets/Pages/Write";
import './style.scss'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Placeholder for the children */}
      <Footer />
    </>
  )
}
const router = createBrowserRouter([
  //When you visit any of the child path, it calls the parent component and replace the placeholder 'Outlet' with the child's component. the path '/' would first call the child path if it's availabe and if not would call the parent path.
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/post/:id',
        element: <Single />
      },
      {
        path: '/write',
        element: <Write />
      },

    ]
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },

])

const App = () => {
  return (
    <div className="app">
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}


export default App;