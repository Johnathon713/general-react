import React, {useRef, useState} from 'react';
import {
  HomeOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SecurityScanOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import {Button, FloatButton, Layout, Menu, theme} from 'antd';
import {NavLink, Outlet} from "react-router-dom";
import {Footer} from 'antd/es/layout/layout';

const {Header, Sider, Content} = Layout;

const Management: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();
  const containerRef = useRef(null);
  // @ts-ignore
  return (<Layout style={{height: '100vh'}}>
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical"
           style={{height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '6px'}}/>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[{key: '10', icon: <HomeOutlined/>, label: <NavLink to="/management/index">主页</NavLink>}, {
          key: '20', label: '用户服务', icon: <UserOutlined/>, children: [{
            key: '21', label: <NavLink to="/management/auth-service/user">用户管理</NavLink>, icon: <UserAddOutlined/>
          }, {
            key: '22',
            label: <NavLink to="/management/auth-service/organization">组织管理</NavLink>,
            icon: <UsergroupAddOutlined/>
          }, {
            key: '23', label: <NavLink to="/management/auth-service/role">角色管理</NavLink>, icon: <UserSwitchOutlined/>
          }, {
            key: '24',
            label: <NavLink to="/management/auth-service/permission">权限管理</NavLink>,
            icon: <SecurityScanOutlined/>
          }]
        }, {
          key: '30',
          label: '身份验证服务',
          icon: <LoginOutlined/>,
          children: [{
            key: '31',
            icon: <HomeOutlined/>,
            label: <NavLink to="/management/authService/login">登录</NavLink>
          }, {key: '32', icon: <HomeOutlined/>, label: <NavLink to="/management/auth-service/register">注册</NavLink>},
            {key: '33', icon: <HomeOutlined/>, label: <NavLink to="/management/auth-service/device">设备管理</NavLink>},
            {key: '34', icon: <HomeOutlined/>, label: <NavLink to="/management/auth-service/client">客户端管理</NavLink>}]
        }]}
      />
    </Sider>
    <Layout style={{height: '100vh'}}>
      <Header style={{padding: 0, background: colorBgContainer}}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px', width: 64, height: 64,
          }}
        />
      </Header>
      <div style={{overflow: 'auto', padding: '1em', height: 'inherit'}} ref={containerRef}>
        <Content
          style={{
            padding: '1em', minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG, height: '100%'
          }}
        >
          <Outlet/>
          <FloatButton.BackTop target={(): HTMLElement | Window | Document => containerRef.current || window}/>
        </Content>
      </div>
      <Footer style={{textAlign: 'center', padding: '0 0 1em'}}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  </Layout>);
};

export default Management;
