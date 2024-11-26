import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import styles from './style.module.scss';
import { Link, Outlet } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <OrderedListOutlined />, label: <Link to="/todo">Todo List</Link> },
  { key: '2', icon: <UserOutlined />, label: <Link to="/user">User Profile</Link>},
];

const MenuComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <Outlet/>
    </div>
  );
};

export default MenuComponent;