import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '@/index.css'
import App from './App.tsx'

import '@ant-design/v5-patch-for-react-19';
import {ConfigProvider} from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'

createRoot(document.getElementById('root')!).render(<StrictMode>
  <ConfigProvider locale={zhCN}>
    <App/>
  </ConfigProvider>
</StrictMode>)
