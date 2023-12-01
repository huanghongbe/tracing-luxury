import React, { useState, useEffect } from 'react';
import CustomIcon from './CustomIcon';
import { Layout, Menu, Button, Dropdown, message } from 'antd';
import { CopyOutlined, DisconnectOutlined } from '@ant-design/icons';
import '../global.css'
import JewelryVerification from './JewelryVerification';
import MyJewelry from './MyJewelry';
import JewelryShop from './JewelryShop1';
import Background from './Background';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Web3 from 'web3';
// import ChainSwitcher from './ChainSwitcher';


//11111

const { Header, Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);

            // 检查是否已连接到网站
            web3Instance.eth.getAccounts().then(accounts => {
                if (accounts.length > 0) {
                    setUserAddress(accounts[0]);
                    setIsConnected(true);
                }
            });

            // 监听MetaMask账户变化事件
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setUserAddress(accounts[0]);
                    setIsConnected(true);
                } else {
                    // 用户断开连接时的处理
                    setIsConnected(false);
                    setUserAddress(null);
                    message.info('BYEBYE~');
                }
            });

            // fetchUserAddress(web3Instance);
        } else {
            message.error('Please install MetaMask!');
        }
    }, []);

    const fetchUserAddress = async (web3Instance) => {
        try {
            const accounts = await web3Instance.eth.getAccounts();
            if (accounts.length > 0) {
                setUserAddress(accounts[0]);
                setIsConnected(true);
            }
        } catch (error) {
            message.error("Error fetching address");
        }
    };

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(userAddress).then(() => {
            message.success('Address copied to clipboard!');
        });
    };


    const handleMenuClick = () => {
        setCollapsed(!collapsed);
    }

    const handleConnectWallet = async () => {
        try {
            if (window.ethereum) {
                // 请求用户连接钱包
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // 更新连接状态和用户地址
                setIsConnected(true);
                fetchUserAddress(web3);
            } else {
                message.error('Please install MetaMask!');
            }
        } catch (error) {
            message.error('Failed to connect wallet');
        }
    };

    const handleExit = () => {
        window.location.href = 'http://localhost:3000'; // 重定向到首页
    };

    const userMenu = (
        <Menu>
            <Menu.Item className="register-button" key="1" icon={<CopyOutlined />} onClick={handleCopyAddress}>
                Copy Address
            </Menu.Item>
            <Menu.Item className="register-button" key="2" icon={<DisconnectOutlined />} onClick={handleExit}>
                Exit
            </Menu.Item>
        </Menu>
    );

    const menuItems = [
        {
            key: '1',
            label: <Link to="/jewelry-shop1">JEWELRY</Link>,
        },
        {
            key: '2',
            label: <Link to="/my-jewelry">MYJEWELS</Link>,
        },
        {
            key: '3',
            label: <Link to="/jewelry-verification">VERIFICATION</Link>,
        },
    ];

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <Background />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Router>
                    <div>
                        <Layout style={{ position: 'relative', width: '100vw', height: '100vh', zIndex: 1, background: 'transparent' }}>
                            <Sider style={{ background: 'transparent' }} trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
                                <Menu
                                    className="custom-menu"
                                    mode="inline"
                                    items={menuItems}
                                >
                                </Menu>

                            </Sider>
                            <Layout style={{ background: 'transparent' }}>
                                <Header style={{ display: 'flex', justifyContent: 'space-between', padding: 0, background: 'transparent' }}>
                                    <Button
                                        type="text"
                                        icon={<CustomIcon />}
                                        onClick={handleMenuClick}
                                        style={{ fontSize: '16px', width: 64, height: 64, color: 'white' }}
                                    />
                                    {isConnected ? (
                                        <Dropdown overlay={userMenu} trigger={['click']}>
                                            <Button type="text" className="register-button" style={{ top: '15px', right: '10px' }}>
                                                {userAddress}
                                            </Button>
                                        </Dropdown>
                                    ) : (
                                        <Button
                                            type="text"
                                            className="register-button"
                                            style={{ top: '15px', right: '10px' }}
                                            onClick={handleConnectWallet}
                                        >
                                            Connect
                                        </Button>
                                    )}
                                </Header>
                                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: 'transparent' }}>
                                    <Routes>
                                        <Route path="/" element={<Navigate to="/jewelry-shop1" />} />
                                        <Route path="/jewelry-shop1" element={<JewelryShop />} />
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