import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const Web3Example = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    // 在组件加载时连接到以太坊网络
    const connectToWeb3 = async () => {
      // 检查Web3对象是否已经存在
      if (window.ethereum) {
        try {
          // 请求用户授权连接到以太坊网络
          await window.ethereum.enable();

          // 创建Web3实例
          const web3 = new Web3(window.ethereum);

          // 获取当前账户地址
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          // 获取账户余额
          const balance = await web3.eth.getBalance(accounts[0]);
          setBalance(web3.utils.fromWei(balance, 'ether'));
        } catch (error) {
          console.error('连接到以太坊网络时出错:', error);
        }
      } else {
        console.error('未检测到以太坊提供者');
      }
    };

    connectToWeb3();
  }, []);

  return (
    <div>
      <h1>Web3.js示例</h1>
      <p>当前账户地址: {account}</p>
      <p>账户余额: {balance} ETH</p>
    </div>
  );
};

export default Web3Example;