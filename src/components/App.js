import React, { useState } from 'react';
import { animated } from 'react-spring';
import {
  // createFromIconfontCN,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, Button, theme, Popover } from 'antd';
import '../global.css'
import JewelryVerification from './JewelryVerification';
import GemRegistration from './GemRegistration';
import GemCutting from './GemCutting';
import GemScoring from './GemScoring';
import MyJewelry from './MyJewelry';
import CompanyRegistry from './CompanyRegistry'
import JewelryShop from './JewelryShop';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  // const colorBgContainer = 'linear-gradient(to right top, #c89cb3, #c59cbd, #be9dc7, #b39fd2, #a3a2dc, #94ace8, #80b5f2, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)';
  //emoji
  const [emoji, setEmoji] = useState('');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const handleMenuClick = (key) => {
    setSelectedKey(key);
    setEmoji(getRandomEmoji());
  }


  // const CustomIcon = createFromIconfontCN({
  //   scriptUrl: '//at.icons8.com/{https://img.icons8.com/plasticine/100/stone-adze.png}.js',
  // })
  const renderContentComponent = () => {
    switch (selectedKey) {
      case '1':
        return <CompanyRegistry />;
      case '2':
        return <GemCutting />;
      case '3':
        return <GemScoring />;
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

  const springProps = ({
    to: { top: emoji ? '50px' : '-100px' },
    from: { top: '-100px' },
  });

  //emoji click
  const getRandomEmoji = () => {
    const emojis = ['😀', '😎', '🤩', '😊', '🥳'];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };

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
              // icon: <UsergroupAddOutlined />,
              icon: <img className="custom-icon" src="https://img.icons8.com/external-filled-outline-geotatah/64/external-company-corporate-social-responsibility-filled-outline-filled-outline-geotatah.png" alt="external-company-corporate-social-responsibility-filled-outline-filled-outline-geotatah" />,
              label: 'Company',
            },
            {
              key: '2',
              // icon: <UploadOutlined />,
              icon: <img className="custom-icon" src="https://img.icons8.com/plasticine/100/stone-adze.png" alt="stone-adze" />,
              label: 'GemMine',
            },
            {
              key: '3',
              // icon: <StrikethroughOutlined />,
              icon: <img className="custom-icon" src="https://img.icons8.com/plasticine/100/rock.png" alt="rock" />,
              label: 'GemScore',
            },
            {
              key: '4',
              // icon: <SketchOutlined />,
              // icon: <img className="custom-icon" src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-jewelry-jewellery-flatart-icons-lineal-color-flatarticons.png" alt="external-jewelry-jewellery-flatart-icons-lineal-color-flatarticons" />,
              icon: <img className="custom-icon" src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-diamond-essentials-icongeek26-linear-colour-icongeek26.png" alt="external-diamond-essentials-icongeek26-linear-colour-icongeek26" />,
              label: 'JewelryR',
            },
            {
              key: '5',
              // icon: <HeatMapOutlined />,
              icon: <img className="custom-icon" src="https://img.icons8.com/matisse/100/jewelry.png" alt="jewelry" />,
              label: 'Myjew',
            },
            {
              key: '6',
              // icon: <UserOutlined />,
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
      {emoji && (
        <animated.div className="emoji-icon" style={springProps}>
          {emoji}
        </animated.div>
      )}
    </Layout>
  );
};
export default App;