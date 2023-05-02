import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayOut from './Components/RootLayOut';
import Home from './Components/Home/Home';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import UserProfile from './Components/user-profile/user-profile'
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayOut />,
      children:[
        {
          path:"/",
          element: <Home/>
        },
        {
          path:"/signup",
          element:<Signup/>
        },
        {
          path:"/signin",
          element:<Signin/>
        },
        {
          path:"user-profile",
          // path:'/user-profile',
          element: <UserProfile/>,
        }
      ]
    }
  ])
  return (
    <div>
      {/* Provide Browser router */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
