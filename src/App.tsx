import {useState} from 'react';
import {BrowserRouter, Navigate, NavLink, Route, Routes} from 'react-router-dom'
import {HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserAddOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd'
import Index from './pages/Index'
import User from './pages/userService/user/User'

const {Header, Sider, Content, Footer} = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout style={{width: '100vw', height: '100vh'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical"
               style={{height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '6px'}}/>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {key: '1', icon: <HomeOutlined/>, label: <NavLink to="/index">index</NavLink>},
              {
                key: '2',
                label: '用户服务',
                icon: <UserOutlined/>,
                children: [
                  {key: '4', label: <NavLink to="/user">用户管理</NavLink>, icon: <UserAddOutlined/>}
                ]
              }
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{padding: 0, background: colorBgContainer}}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
              onClick={() => setCollapsed(!collapsed)}
              style={{fontSize: '16px', width: 64, height: 64}}
            />
          </Header>
          <Content style={{
            margin: '16px 10px',
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto'
          }}>
            <Routes>
              <Route path="/" element={<Navigate to="/index"/>}/>
              <Route path="/index" element={<Index/>}/>
              <Route path="/user" element={<User/>}/>
            </Routes>
          </Content>
          <Footer style={{textAlign: 'center', padding: '0 50px 8px'}}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}

export default App
