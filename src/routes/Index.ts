import {createBrowserRouter} from 'react-router-dom'
import Index from '@/pages/Index.tsx'
import Management from '@/pages/Management/Index.tsx'

export default createBrowserRouter([
  {path: '/index', Component: Index},
  {path: '/management', Component: Management}
])
