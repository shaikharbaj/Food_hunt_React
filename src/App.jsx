import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import RestaurantMenuPage from './Pages/RestaurantMenuPage'
import AboutusPage from './Pages/AboutusPage'
import ContactPage from './Pages/ContactPage'
import CartPage from './Pages/CartPage'
import Error from './Components/Error/Error'
import useOnline from './Hooks/useOnline'
import Offline from './Components/Offline/Offline'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import CheckoutPage from './Pages/CheckoutPage'
import ProtectedRoute from './utils/ProtectedRoute'
import Popup from './Components/Popup/Popup'

const AppLayout = () => {
  
  return (
    <>
      <Header />
      <div className='body'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <AboutusPage />
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenuPage />
      },
      {
          path:"/checkout",
          element:<ProtectedRoute><CheckoutPage/></ProtectedRoute>
      },
      {
        path:"/login",
        element:<LoginPage/>
      },
      {
         path:"/register",
         element:<RegisterPage/>
      }
    ]
  }
])


function App() {
  const online = useOnline();
  if(!online) return <Offline/>
  return (
    <>
      <RouterProvider router={appRouter} />
      <Popup/>
    </>
  )
}

export default App
