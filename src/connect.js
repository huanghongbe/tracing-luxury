import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Connect = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // 在组件挂载时初始化Web3对象
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          // 请求用户授权连接钱包
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // 创建Web3实例
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        } catch (error) {
          console.error('Failed to connect to wallet:', error);
        }
      } else {
        console.error('No wallet detected');
      }
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    // 获取当前选中钱包的账户地址
    const getAccount = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };

    getAccount();
  }, [web3]);

  return (
    <div>
      {web3 && <p>Connected to wallet</p>}
      {account && <p>Account: {account}</p>}
      {!web3 && <p>Please connect your wallet</p>}
    </div>
  );
};

export default Connect;