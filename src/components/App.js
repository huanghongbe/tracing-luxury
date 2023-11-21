import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import '../global.css'
import JewelryVerification from './JewelryVerification';
import RawDiamondRegistry from './RawDiamondRegistry';
import DiamondRegistry from './DiamondRegistry';
import MyJewelry from './MyJewelry';
import CompanyRegistry from './CompanyRegistry'
import JewelryShop from './JewelryShop';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  
  const handleMenuClick = (key) => {
    setSelectedKey(key);
  }

  const renderContentComponent = () => {
    switch (selectedKey) {
      case '1':
        return <CompanyRegistry />;
      case '2':
        return <RawDiamondRegistry />;
      case '3':
        return <DiamondRegistry />;
      case '4':
        return <JewelryShop />;
      case '5':
        return <MyJewelry />;
      case '6':
        return <JewelryVerification />;
      default:
        return null;
    }
  };
  
  // const emojis = ['😀', '😎', '🤩', '😊', '🥳'];
  return (
    <Layout style={{ background: 'transparent'}} >
      <div>
    </div>
      <Sider  style={{ background: 'transparent'}} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          className="custom-menu"
          // theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: '1',
              icon: <img className="custom-icon" src="https://img.icons8.com/external-filled-outline-geotatah/64/external-company-corporate-social-responsibility-filled-outline-filled-outline-geotatah.png" alt="external-company-corporate-social-responsibility-filled-outline-filled-outline-geotatah" />,
              label: 'Company',
            },
            {
              key: '2',
              icon: <img className="custom-icon" src="https://img.icons8.com/plasticine/100/stone-adze.png" alt="stone-adze" />,
              label: 'GemMine',
            },
            {
              key: '3',
              icon: <img className="custom-icon" src="https://img.icons8.com/plasticine/100/rock.png" alt="rock" />,
              label: 'GemScore',
            },
            {
              key: '4',
              icon: <img className="custom-icon" src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-diamond-essentials-icongeek26-linear-colour-icongeek26.png" alt="external-diamond-essentials-icongeek26-linear-colour-icongeek26" />,
              label: 'JewelryR',
            },
            {
              key: '5',
              icon: <img className="custom-icon" src="https://img.icons8.com/matisse/100/jewelry.png" alt="jewelry" />,
              label: 'Myjew',
            },
            {
              key: '6',
              icon: <img className="custom-icon" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-diamond-award-and-success-wanicon-lineal-color-wanicon.png" alt="external-diamond-award-and-success-wanicon-lineal-color-wanicon" />,
              label: 'JewVerfiy',
            },
          ]}
        />
      </Sider>
      {/* <Layout style={{ background: 'linear-gradient(to right top, #c89cb3, #c59cbd, #be9dc7, #b39fd2, #a3a2dc, #94ace8, #80b5f2, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)'}} > */}
        <Layout style={{ background: 'transparent'}}>
        <Header
          style={{
            padding: 0,
            background: 'transparent',
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
            background: 'transparent',
          }}
        >
          {renderContentComponent()}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;