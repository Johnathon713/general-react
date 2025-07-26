import {RouterProvider} from 'react-router-dom'
import router from '@/routes'
import '@/App.css'
import {useEffect} from "react";

export default function App() {
  // React 在开发模式下会故意重复挂载组件，以帮助检测副作用（如 useEffect 清理函数）是否正确实现。
  let noRunning = true
  useEffect(() => {
    if (noRunning) {
      noRunning = false
      const cpuCount = navigator.hardwareConcurrency;
      const languages = navigator.languages
      const platform = navigator.platform
    }
    console.log('组件加载完成');
    return () => {
      console.log('组件卸载');
    }
  }, [])
  return (<RouterProvider router={router}/>)
}
