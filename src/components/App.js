import React, { useState } from 'react';
import {
  // createFromIconfontCN,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  StrikethroughOutlined,
  HeatMapOutlined,
  SketchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import '../global.css'
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
  // const CustomIcon = createFromIconfontCN({
  //   scriptUrl: '//at.icons8.com/{https://img.icons8.com/plasticine/100/stone-adze.png}.js',
  // })
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
              label: '验证珠宝',
            },
            {
              key: '2',
              // icon: <UsergroupAddOutlined />,
              icon: <img className="custom-icon" src="https://img.icons8.com/external-filled-outline-geotatah/64/external-company-corporate-social-responsibility-filled-outline-filled-outline-geotatah.png" alt="external-company-corporate-social-responsibility-filled-outline-filled-outline-geotatah" />,
              label: '公司注册',
            },
            {
              key: '3',
              // icon: <UploadOutlined />,
              icon: <img className="custom-icon" src="https://img.icons8.com/plasticine/100/stone-adze.png" alt="stone-adze" />,
              label: '原石注册',
            },
            {
              key: '4',
              // icon: <StrikethroughOutlined />,
              icon: <img className="custom-icon" src="https://img.icons8.com/plasticine/100/rock.png" alt="rock" />,
              label: '原石打分',
            },
            {
              key: '5',
              // icon: <SketchOutlined />,
              icon: <img className="custom-icon" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-diamond-award-and-success-wanicon-lineal-color-wanicon.png" alt="external-diamond-award-and-success-wanicon-lineal-color-wanicon" />,
              label: '我的珠宝',
            },
            {
              key: '6',
              icon: <HeatMapOutlined />,
              label: '珠宝注册',
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