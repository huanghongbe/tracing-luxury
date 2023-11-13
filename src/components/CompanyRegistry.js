import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Web3 from 'web3';

const CompanyRegistry = () => {
  const [companyData, setCompanyData] = useState([]);

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  useEffect(() => {
    // 获取公司信息的数据，假设从后端API获取
    const fetchData = async () => {
      try {
        const response = await fetch('/api/companies');
        const data = await response.json();
        setCompanyData(data);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

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
          console.log(accounts);
          console.log(balance);
        } catch (error) {
          console.error('连接到以太坊网络时出错:', error);
        }
      } else {
        console.error('未检测到以太坊提供者');
      }
    };
    fetchData();
    connectToWeb3();
  }, []);

  const columns = [
    {
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所在地',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
    },
    // 可根据实际情况添加更多列
  ];

  return (
    <div>
      <h1>公司信息</h1>
      <Table dataSource={companyData} columns={columns} />
    </div>
  );
};

export default CompanyRegistry;