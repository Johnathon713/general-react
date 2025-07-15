import {createBrowserRouter} from 'react-router-dom'
import Home from '@/pages/Home'
import Index from '@/pages/Index'
import Management from '@/pages/Management/Index'
import NotFound from '@/pages/NotFound'
import User from '@/pages/authService/User'

export default createBrowserRouter([
  {path: '/', Component: Home },
  {path: '/index', Component: Index},
  {path: '/management', Component: Management, children: [
      { path: '*', Component: Index },
      { path: 'authService/user', Component: User },
    ]},
  {path: '*', Component: NotFound}
])
