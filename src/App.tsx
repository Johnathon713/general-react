import {RouterProvider} from 'react-router-dom'
import router from '@/routes'
import '@/App.css'
import {useEffect} from "react";
import request from "@/utils/request.ts";

export default function App() {
  // React 在开发模式下会故意重复挂载组件，以帮助检测副作用（如 useEffect 清理函数）是否正确实现。
  let noRunning = true
  useEffect(() => {
    if (noRunning) {
      noRunning = false
      const params = {clientId: localStorage.getItem('clientId'), cpuThreadCount: navigator.hardwareConcurrency, deviceKey: import.meta.env.VITE_APP_DEVICE_KEY}
      request.post('/auth_service/client/init', params).then(({data}) => {
        localStorage.setItem('clientId', data.data)
      }).catch(({response: {data}}) => {
        console.error(data.error)
      })
    }
    console.log('APP组件加载完成');
    return () => {
      console.log('APP组件即将卸载');
    }
  }, [])
  return (<RouterProvider router={router}/>)
}
