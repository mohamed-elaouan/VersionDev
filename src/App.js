import "./App.css";
import Home from "./Home/Home";
import Categorie from "./Categorie";
import Contact from "./Contact";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp";
import Profil from "./Profil/Profil";
//Dashboard 
import ShowProblem from './Dashboard/ShowProblem.jsx';
import AddNewAdmin from './Dashboard/AddNewAdmin.jsx';
import Admins from './Dashboard/Admins';
import Processing from './Dashboard/Proccesing';
import NotFound from "./Error404";
import { useContext } from "react";
import ThemeProvider from "./Context/DataContext";
import "./Compenent/Themes.css"

//React Route:
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound/>,
  },{
    path: "/SignIn",
    element: <SignIn />,
    errorElement: <NotFound/>,
  },
  {
    path: "/Categorie",
    // @ts-ignore
    element: <Categorie />,
    errorElement: <NotFound/>,
  },
  {
    path: "/Contact",
    // @ts-ignore
    element: <Contact />,
    errorElement: <NotFound/>,
  },{
    path: "/SignUp",
    element: <SignUp />,
    errorElement: <NotFound/>,
  },
  {
    path: "/Profil",
    // @ts-ignore
    element: <Profil />,
    errorElement: <NotFound/>,
  },
  //Dashboard
  {
    path: "/ShowProblem",
    // @ts-ignore
    element: <ShowProblem />,
    errorElement: <NotFound/>,
  },
  {
    path: "/AddNewAdmin",
    // @ts-ignore
    element: <AddNewAdmin />,
    errorElement: <NotFound/>,
  },
  {
    path: "/Admins",
    // @ts-ignore
    element: <Admins/>,
    errorElement: <NotFound/>,
  },
  {
    path: "/Processing",
    // @ts-ignore
    element: <Processing/>,
    errorElement: <NotFound/>,
  }

]);

function App() {
  const { theme } = useContext(ThemeProvider);
  return (
    <div className={`main ${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
