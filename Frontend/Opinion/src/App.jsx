import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./Pages/Signup";
import Accueil from "./Pages/Accueil";
import Login from "./Pages/Login"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const client = new QueryClient();


const router = createBrowserRouter([
  { 
    path: "/",
    element: <Signup />,
  },
  {
    path: "/Accueil",
    element: <Accueil />,
  },
  {
    path: "/Login",
    element: <Login />,
  },

]);

function App() {
  return <QueryClientProvider client={client}>
    <RouterProvider router={router}/>
  </QueryClientProvider>
}

export default App;
