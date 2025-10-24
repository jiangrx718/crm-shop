import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar.tsx';
import AppHeader from './AppHeader.tsx';

const { Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <AppHeader />
        <Content style={{ margin: '16px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;