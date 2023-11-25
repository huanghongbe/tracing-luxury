import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Avatar } from 'antd';
import '../global.css'
import JewelryVerification from './JewelryVerification';
import RawDiamondRegistry from './RawDiamondRegistry';
import DiamondRegistry from './DiamondRegistry';
import MyJewelry from './MyJewelry';
import CompanyRegistry from './CompanyRegistry'
import JewelryShop from './JewelryShop';
import Background from './Background';
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const [users, setUsers] = useState([]);

 
  const handleMenuClick = () => {
    setCollapsed(!collapsed);
  }

  const iconUrlMap = {
    // company: 'https://img.icons8.com/external-filled-outline-geotatah/64/external-company-corporate-social-responsibility-filled-outline-filled-outline-geotatah.png',
    // gemMine: 'https://img.icons8.com/plasticine/100/stone-adze.png',
    company: 'https://img.icons8.com/arcade/64/skyscrapers.png' ,
    // gemMine: 'https://img.icons8.com/plasticine/100/rock.png',
    gemMine :'https://img.icons8.com/arcade/64/coal.png' ,
    gemScore: 'https://img.icons8.com/arcade/64/diamond.png' ,
    // jewelryShop: 'https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-diamond-essentials-icongeek26-linear-colour-icongeek26.png',
    jewelryShop: 'https://img.icons8.com/arcade/64/bracelet.png' ,
    // myJewelry: 'https://img.icons8.com/matisse/100/jewelry.png',
    myJewelry: 'https://img.icons8.com/arcade/64/jewelry.png',
    // jewelryVerification: 'https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-diamond-award-and-success-wanicon-lineal-color-wanicon.png',
    jewelryVerification: 'https://img.icons8.com/arcade/64/monocle.png',
  };

  const menuItems = [
    {
      key: '1',
      label: <Link to="/company-registry">CompanyR</Link>,
      icon: <img className="custom-icon" src={iconUrlMap.company} alt="Company" />,
    },
    {
      key: '2',
      label: <Link to="/raw-diamond-registry">RawgemR</Link>,
      icon: <img className="custom-icon" src={iconUrlMap.gemMine} alt="GemMine" />,
    },
    {
      key: '3',
      label: <Link to="/diamond-registry">DiamondR</Link>,
      icon: <img className="custom-icon" src={iconUrlMap.gemScore} alt="GemScore" />,
    },
    {
      key: '4',
      label: <Link to="/jewelry-shop">JewelryR</Link>,
      icon: <img className="custom-icon" src={iconUrlMap.jewelryShop} alt="JewelryR" />,
    },
    {
      key: '5',
      label: <Link to="/my-jewelry">Myjewels</Link>,
      icon: <img className="custom-icon" src={iconUrlMap.myJewelry} alt="Myjew" />,
    },
    {
      key: '6',
      label: <Link to="/jewelry-verification">JewVerify</Link>,
      icon: <img className="custom-icon" src={iconUrlMap.jewelryVerification} alt="JewVerify" />,
    },
  ];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Background />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Router>
          <div>
            <Layout style={{ position: 'relative', width: '100vw', height: '100vh', zIndex: 1, background: 'transparent' }}>
              <Sider style={{ background: 'transparent' }} trigger={null} collapsible collapsed={collapsed}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop:'10px' }}>
                <div className="demo-logo-vertical" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}/>
                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px'}}>
                <Avatar size={45} src={avatarUrl} />
                </div> */}
                <Menu
                  className="custom-menu"
                  mode="inline"
                  items = {menuItems}
                >
                </Menu>
                </div>
              </Sider>
              <Layout style={{ background: 'transparent' }}>
                <Header style={{ padding: 0, background: 'transparent' }}>
                  <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                   onClick={handleMenuClick}
                    style={{ fontSize: '16px', width: 64, height: 64, color:'white'}}
                  />
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: 'transparent' }}>
                  <Routes>
                    <Route path="/company-registry" element={<CompanyRegistry />} />
                    <Route path="/raw-diamond-registry" element={<RawDiamondRegistry />} />
                    <Route path="/diamond-registry" element={<DiamondRegistry />} />
                    <Route path="/jewelry-shop" element={<JewelryShop />} />
                    <Route path="/my-jewelry" element={<MyJewelry />} />
                    <Route path="/jewelry-verification" element={<JewelryVerification />} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;