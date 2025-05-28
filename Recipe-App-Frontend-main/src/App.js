
/**This is a JS file that configures the routing for a React application using 
 * the react-router-dom library. It defines the routes and 
 * their corresponding components to be rendered based on the current URL. */
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider
 
} from 'react-router-dom'
import './App.css';

//Layouts
import RootLayout from './layouts/RootLayout'

// Auth
import RequireAuth from './components/RequireAuth';

//Pages
import RecipesPage from './pages/RecipesPage';
import HomePage from './pages/HomePage.js'
import ErrorPage from './pages/ErrorPage.js'
import SortedRecipes from './pages/SortedRecipes.js'
import CreateRecipe from './pages/CreateRecipe';
import Profile from './pages/Profile';
import RecipePage from './pages/RecipePage'
import AboutUsPage from './pages/AboutUsPage'
import EditRecipe from './pages/EditRecipe';
import PersistLogin from './components/PersistLogin';
import SearchPage from './pages/searchPage';
import StartHerePage from './pages/StartHerePage';
import UpdateProfile from './pages/UpdateProfile.js';
import Unauthorized from './components/Unauthorized';
import AdminLayout from './layouts/AdminLayout';
import Adminpage from './pages/Adminpage';
import AdmingRecipes from './pages/AdmingRecipes';
import AdminComments from './pages/AdminComments';

// Define a mapping of roles to their corresponding values
const ROLES_LIST = {
  'User': 80085,
  'Admin': 420420
}

// Create a BrowserRouter and define routes using createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
  
<Route element={<PersistLogin/>}>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="category">
          <Route element={<SortedRecipes />} 
          path=":sortedByCategory" 
        />
      </Route>
      <Route path='StartHere' element={<StartHerePage/>}/>
      <Route path='AboutUs' element={<AboutUsPage/>}/>
      <Route path='SearchRecipe' element={<SearchPage/>}/>
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* user auth */}
      <Route path='recipe'>
        <Route index element={<RecipesPage />} />
        <Route path=':id' element={<RecipePage/>}/>
        <Route element ={<RequireAuth allowedRoles={[ROLES_LIST.User]}/>}>
          <Route path='edit'>
            <Route path=':id' element={<EditRecipe/>}/>
          </Route>
        </Route>
      </Route>

      <Route element ={<RequireAuth allowedRoles={[ROLES_LIST.User]}/>}>
        <Route path="CreateRecipe" element={<CreateRecipe />} />
        <Route path="profile" element={<Profile/>}/>
        <Route path='updateProfile'>
             <Route path=':id' element={<UpdateProfile/>}/>
       </Route>
       
        <Route element ={<RequireAuth allowedRoles={[ROLES_LIST.Admin]}/>}>
            <Route path="admin" element={<AdminLayout/>}>
              <Route path='user'>
                <Route index element={<Adminpage/>}/>
              </Route>
              <Route path='recipe'>
                <Route index element={<AdmingRecipes/>}/>
              </Route>
              <Route path='comments'>
                <Route index element={<AdminComments/>}/>
              </Route>
            </Route>
        </Route>
      </Route>
      {/* Admin auth */}

      <Route path="*" element={<ErrorPage />} />
  </Route>
</Route>

  )
)

function App() {
  return (
    <RouterProvider router={router} />

  );
}

export default App;
