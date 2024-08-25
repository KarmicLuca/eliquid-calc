import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home';
import NicBaseCalculator from './NicBase'
import MixCalculator from './Mix'
import Gorilla from './Gorilla'
import '../assets/App.css'

const router = createBrowserRouter([
  {
    path: '/eliquid-calc/',
    element: <Home></Home>,
    children: [
      {
        path: 'nicbase',
        element: <NicBaseCalculator></NicBaseCalculator>
      },
      {
        path: 'mixcalculator',
        element: <MixCalculator></MixCalculator>
      }
    ]
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
