import "./App.css";
import {
  createBrowserRouter,
  useNavigate,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Root from "./components/Root/Root";
import Auth from "./components/LogIn/Auth";
import { authAction } from "./components/LogIn/Auth";
import Grievance from './components/InputForms/Grievance'
import { useContext, useEffect, useState } from "react";
import { grievanceAction } from "./components/InputForms/Grievance";
import Tables, { loader } from "./components/GramPanchayat/GramPanchayat";
import { loader as UMCloader } from "./components/GramPanchayat/GramPanchayat";
import GramPanchayatdashboard from "./components/WUC/WUC";
import { loader as gramPanchayatLoader } from "./components/WUC/WUC";
import Dashform from "./components/Dashboard/Dashform";
import DashboardWMC from "./components/DashboardWMC/DashboardWMC";
import { action as actionWMC } from "./components/DashboardWMC/DashboardWMC";
import DashboardPC from "./components/DashboardPC/DashboardPC";
import Hero from "./components/Home/Home";
import GovermentDashboard from "./components/GovermentDashBoard/GovermentDashBoard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path:'/',
        element:<Hero/>
      },
      {
        path:'/grievances',
        element:<Grievance/>,
        action:grievanceAction
      },{
        path:'/dashboardWUC',
        element:<Tables/>,
        loader:UMCloader
      },
      {
        path:'/dashboardGram',
        element:<GramPanchayatdashboard/>,
        loader:gramPanchayatLoader
      },
      {
        path:'/dashboardNGO',
        element:<Dashform/>,
        // loader:gramPanchayatLoader
      },
      {
        path:'/dashboardWMC',
        element:<DashboardWMC/>,
        // loader:gramPanchayatLoader
        action:actionWMC
      },
      {
        path:'/dashboardPC',
        element:<DashboardPC/>,
        // loader:gramPanchayatLoader
        
      },
      {
        path:'/dashboardGOV',
        element:<GovermentDashboard/>,
        // loader:gramPanchayatLoader
        
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
    action: authAction,
  },
  {
    path: "/signup",
    element: <Auth />,
    action: authAction,
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
