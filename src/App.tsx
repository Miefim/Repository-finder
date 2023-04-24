import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';

import { paginationSelector } from './redux/slices/paginationSlice'
import { repositoriesSelector } from './redux/slices/repositoriesSlice'
import { searchSelector } from './redux/slices/searchSlice'
import MainPage from './pages/MainPage';
import DetailsPage from './pages/DetailsPage';
import './App.css'
import { useEffect } from 'react';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<MainPage />} />
    <Route path="/:id" element={<DetailsPage />} />
  </>
))

function App() {
  const { page, button } = useSelector(paginationSelector)
  const { startCursor, endCursor, isFirstQuery } = useSelector(repositoriesSelector)
  const { searchValue } = useSelector(searchSelector)

  useEffect(() => {

    if(!isFirstQuery){
      const object = {
        page,
        button,
        startCursor,
        endCursor,
        searchValue
      }
  
      localStorage.setItem('gitHubGraphqlApi', JSON.stringify(object))
    }

  },[page, searchValue])

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
