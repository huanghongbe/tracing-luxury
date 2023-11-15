import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  StrikethroughOutlined,
  HeatMapOutlined,
  SketchOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

import JewelryVerification from './JewelryVerification';
import GemRegistration from './GemRegistration';
import GemCutting from './GemCutting';
import GemScoring from './GemScoring';
import MyJewelry from './MyJewelry';
import JewelryRegistration from './JewelryRegistration';
import CompanyRegistry from './CompanyRegistry'

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };
  const renderContentComponent = () => {
    switch (selectedKey) {
      case '1':
        return <JewelryVerification />;
      case '2':
        return <CompanyRegistry />;
      case '3':
        return <GemCutting />;
      case '4':
        return <GemScoring />;
      case '5':
        return <MyJewelry />;
      case '6':
        return <JewelryRegistration />;
      default:
        return null;
    }
  };

  return (
    
    <Layout>
      <div>
    </div>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Verify',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Company Register',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Raw Diamonds',
            },
            {
              key: '4',
              icon: <StrikethroughOutlined />,
              label: 'Diamonds',
            },
            {
              key: '5',
              icon: <HeatMapOutlined />,
              label: 'My Jewels',
            },
            {
              key: '6',
              icon: <SketchOutlined />,
              label: 'test',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {renderContentComponent()}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;