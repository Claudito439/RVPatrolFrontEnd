import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MapReport from './Pages/MapReport';
import BasicContent from "./Pages/BasicContent";
import { ThemeProvider } from "@/context/theme-provider"
import MapInformation from "./Pages/MapInformation";
import Dashboard from "./Pages/Dashboard";
import Reports from "./Pages/Reports";
import Login from "./Pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./Pages/PrivateRoute";
import Users from "./Pages/Users";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <BasicContent />,
        children: [
          {
            path: "/",
            element: <MapReport />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "maps/:mapId",
            element: <MapInformation />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ]
      },
    ]
  },
]);


function App() {

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>


  )
}

export default App
