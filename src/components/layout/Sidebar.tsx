import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { 
  AppstoreOutlined, 
  ShoppingOutlined, 
  UserOutlined, 
  SettingOutlined,
  BarChartOutlined,
  TagsOutlined,
  ShopOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <BarChartOutlined />,
      label: '数据统计',
    },
    {
      key: 'product',
      icon: <ShoppingOutlined />,
      label: '商品管理',
      children: [
        {
          key: 'product',
          label: '商品列表',
          onClick: () => navigate('/product'),
        },
        {
          key: 'category',
          label: '商品分类',
          onClick: () => navigate('/category'),
        },
        {
          key: 'product-tag',
          label: '商品标签',
        },
      ],
    },
    {
      key: 'order',
      icon: <FileTextOutlined />,
      label: '订单管理',
    },
    {
      key: 'user',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: 'shop',
      icon: <ShopOutlined />,
      label: '店铺管理',
    },
    {
      key: 'marketing',
      icon: <TagsOutlined />,
      label: '营销活动',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const handleMenuClick = (key: string) => {
    if (key === 'category') {
      navigate('/category');
    } else if (key === 'product-list') {
      navigate('/products');
    } else {
      navigate(`/${key}`);
    }
  };

  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
      style={{ 
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AppstoreOutlined style={{ color: 'white', fontSize: '20px' }} />
        {!collapsed && <span style={{ color: 'white', marginLeft: 8, fontWeight: 'bold' }}>CRM商品管理</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['category']}
        defaultOpenKeys={['product']}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
      />
    </Sider>
  );
};

export default Sidebar;