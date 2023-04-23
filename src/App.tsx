import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import DetailsPage from './pages/DetailsPage';
import './App.css'

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<MainPage />} />
    <Route path="/:id" element={<DetailsPage />} />
  </>
))

function App() { 
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
