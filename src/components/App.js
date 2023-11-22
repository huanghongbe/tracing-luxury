import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import '../global.css'
import JewelryVerification from './JewelryVerification';
import RawDiamondRegistry from './RawDiamondRegistry';
import DiamondRegistry from './DiamondRegistry';
import MyJewelry from './MyJewelry';
import CompanyRegistry from './CompanyRegistry'
import JewelryShop from './JewelryShop';
import Background from './Background';
// import { extend } from '@react-three/fiber';
// import { Canvas } from "@react-three/fiber";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


// extend({ Canvas });

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = () => {
    setCollapsed(!collapsed);
  }

  return (

    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
    <Background />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    <Router>
      <div>
      {/* <div style={{ position: 'relative' }}>
      <Background />
      </div> */}
      <Layout style={{ positon:'relative', width:'100vw',height: '100vh', zIndex: 1, background: 'transparent'}} >
        <Sider  style={{ background: 'transparent'}} trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            className="custom-menu"
            mode="inline"
            // onClick={handleMenuClick}
            selectedKeys={[]}
          >
            <Menu.Item key="1" icon={<img className="custom-icon" src="https://img.icons8.com/external-filled-outline-geotatah/64/external-company-corporate-social-responsibility-filled-outline-filled-outline-geotatah.png" alt="external-company-corporate-social-responsibility-filled-outline-filled-outline-geotatah" />}>
              <Link to="/company-registry">Company</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<img className="custom-icon" src="https://img.icons8.com/plasticine/100/stone-adze.png" alt="stone-adze" />}>
              <Link to="/raw-diamond-registry">GemMine</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<img className="custom-icon" src="https://img.icons8.com/plasticine/100/rock.png" alt="rock" />}>
              <Link to="/diamond-registry">GemScore</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<img className="custom-icon" src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-diamond-essentials-icongeek26-linear-colour-icongeek26.png" alt="external-diamond-essentials-icongeek26-linear-colour-icongeek26" />}>
              <Link to="/jewelry-shop">JewelryR</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<img className="custom-icon" src="https://img.icons8.com/matisse/100/jewelry.png" alt="jewelry" />}>
              <Link to="/my-jewelry">Myjew</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<img className="custom-icon" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-diamond-award-and-success-wanicon-lineal-color-wanicon.png" alt="external-diamond-award-and-success-wanicon-lineal-color-wanicon" />}>
              <Link to="/jewelry-verification">JewVerify</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ background: 'transparent'}}>
          <Header style={{ padding: 0, background: 'transparent' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleMenuClick}
              style={{ fontSize: '16px', width: 64, height: 64 }}
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
      {/* <Background style={{ zIndex: -1, top: 0, left: 0, width:"100%", height:"100%" }} /> */}
      </div>
      
    </Router>
    </div>
  </div>
    
   
    
  );
}

export default App;