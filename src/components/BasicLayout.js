import { Layout } from 'antd';
import React, { useState } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { CustomFooter as Footer } from './Footer';

import './style.less';

const { Header, Content } = Layout;

export default function BasicLayout({ children, setActivePage }) {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  return (
    <React.Fragment>
      <Layout>
        <Layout
          style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
          }}
        >
          <Header style={{ padding: 0, minHeight: 64, height: 'unset' }}>
            <TopBar
              setMenuCollapsed={setMenuCollapsed}
              menuCollapsed={menuCollapsed}
            />
          </Header>
          <Layout>
            <Sidebar
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
              setActivePage={setActivePage}
            />
            <Content className="content-main" style={{ flex: 1 }}>
              {children}
            </Content>
          </Layout>

          <Footer />
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
