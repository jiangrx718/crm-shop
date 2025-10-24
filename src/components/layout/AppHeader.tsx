import React from 'react';
import { Layout, Menu, Button, Dropdown, Space } from 'antd';
import { UserOutlined, DownOutlined, BellOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const userMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: '个人信息',
        },
        {
          key: '2',
          label: '修改密码',
        },
        {
          key: '3',
          label: '退出登录',
        },
      ]}
    />
  );

  return (
    <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ marginLeft: 16 }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>CRM商品管理系统</span>
      </div>
      <div style={{ marginRight: 16 }}>
        <Space>
          <Button type="text" icon={<BellOutlined />} />
          <Dropdown overlay={userMenu}>
            <Button type="text">
              <Space>
                <UserOutlined />
                管理员
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default AppHeader;