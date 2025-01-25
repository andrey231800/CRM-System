import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router';
import styles from './style.module.scss'

const { Sider } = Layout;

const MenuComponent: React.FC = () => {
  
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={styles.wrapper}>
        <Layout className={styles.layout}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  icon: <OrderedListOutlined />,
                  label: <Link to="/dashboard/todo">Todo List</Link>
                },
                {
                  key: '2',
                  icon: <UserOutlined />,
                  label: <Link to="/dashboard/user">User Profile</Link>
                },
              ]}
            />
          </Sider>
        <Layout>
            <Button
              type="primary"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 50,
                height: 50,
                backgroundColor: "blue"
              }}
            />
        </Layout>
      </Layout>
      <Outlet/>
    </div>
  );
};

export default MenuComponent;