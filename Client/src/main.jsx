import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvder } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Checkout from './routes/Checkout.jsx';
import Confirmation from './routes/Confirmation.jsx';
import Details from './routes/Details.jsx';
import Login from './routes/Login.jsx';
import Logout from './routes/Logout.jsx';
import Signup from './routes/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/confirmation",
        element: <Confirmation />
      },
      {
        path: "/details",
        element: <Details />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/signup",
        element: <Signup />
      },
    ]
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
