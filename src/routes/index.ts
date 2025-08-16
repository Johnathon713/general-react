import {createBrowserRouter} from 'react-router-dom'
import Home from '@/pages/Home'
import Index from '@/pages/Index'
import Management from '@/pages/Management/Index'
import NotFound from '@/pages/NotFound'
import User from '@/pages/authService/User'
import Device from "@/pages/authService/Device.tsx";
import Client from "@/pages/authService/Client.tsx";

export default createBrowserRouter([
  {path: '/', Component: Home },
  {path: '/index', Component: Index},
  {path: '/management', Component: Management, children: [
      { path: '*', Component: Index },
      { path: 'auth-service/user', Component: User },
      { path: 'auth-service/device', Component: Device},
      { path: 'auth-service/client', Component: Client},
    ]},
  {path: '*', Component: NotFound}
])
