import {useState} from 'react';
import {BrowserRouter, Navigate, NavLink, Route, Routes} from 'react-router-dom'
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SecurityScanOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd'
import Index from './pages/Index'
import User from './pages/userService/User'
import Organization from './pages/userService/Organization'
import Role from './pages/userService/Role'
import Permission from './pages/userService/Permission'

const {Header, Sider, Content, Footer} = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  return (<BrowserRouter>
      <Layout style={{width: '100vw', height: '100vh'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical"
               style={{height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '6px'}}/>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[{key: '10', icon: <HomeOutlined/>, label: <NavLink to="/index">主页</NavLink>}, {
              key: '20',
              label: '用户服务',
              icon: <UserOutlined/>,
              children: [{
                key: '21',
                label: <NavLink to="/userService/user">用户管理</NavLink>,
                icon: <UserAddOutlined/>
              }, {
                key: '22',
                label: <NavLink to="/userService/organization">组织管理</NavLink>,
                icon: <UsergroupAddOutlined/>
              }, {
                key: '23',
                label: <NavLink to="/userService/role">角色管理</NavLink>,
                icon: <UserSwitchOutlined/>
              }, {
                key: '24',
                label: <NavLink to="/userService/permission">权限管理</NavLink>,
                icon: <SecurityScanOutlined/>
              }]
            }]}
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
              <Route path="/userService/user" element={<User/>}/>
              <Route path="/userService/organization" element={<Organization/>}/>
              <Route path="/userService/role" element={<Role/>}/>
              <Route path="/userService/permission" element={<Permission/>}/>
            </Routes>
          </Content>
          <Footer style={{textAlign: 'center', padding: '0 50px 8px'}}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>)
}

export default App
