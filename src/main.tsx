import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { PokemonDetailsPage } from './components/PokemonDetailsPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetailsPage />,
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
