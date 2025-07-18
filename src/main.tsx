import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router";
import { PokemonDetails } from './components/PokemonDetails.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetails />,
  },
  {
    path: "/pokemon/:name",
    element: <div>Pokemon Details by Name</div>, // Placeholder for Pokemon details by
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
