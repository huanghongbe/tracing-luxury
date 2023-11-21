import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Input, message, Select } from 'antd';
import Web3 from 'web3';
import JewelryShopABI from '../abis/JewelryShop.json'
const { Option } = Select;
const MyJewelry = () => {
  const [jewelryData, setJewelryData] = useState(null);
  const [contract, setContract] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [transferAddress, setTransferAddress] = useState('');
  const [selectedJewelryId, setSelectedJewelryId] = useState('');


  const handleModalOk = () => {
    setModalVisible(false);
  };
  

  const handleTransfer = async () => {
    setModalVisible(true);
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      const userAddress = window.ethereum.selectedAddress;
      await contract.methods.transferTo(selectedJewelryId, transferAddress).send({ from: userAddress });
      console.log('转移成功');
      message.success('转移成功');

      const jewelries = await contract.methods.getAllJewels().call();
      console.log('珠宝数组:', jewelries);

      setJewelryData(jewelries);
    } catch (error) {
      console.error('转移失败:', error);
      message.error('转移失败');
    }
  };

  useEffect(() => {
    // 监听账户变化
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        // 账户发生变化，刷新页面重新获取数据
        window.location.reload();
      }
    };

    // 添加账户变化事件监听器
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    const connectToWeb3 = async () => {
      // 检查Web3对象是否已经存在
      if (window.ethereum) {
        try {
          // 连接到以太坊网络
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();

          // 获取合约实例
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = JewelryShopABI.networks[networkId];
          const contract = new web3.eth.Contract(
            JewelryShopABI.abi,
            deployedNetwork && deployedNetwork.address
          );

          const addresses = await web3.eth.getAccounts();
          const userAddress = addresses[0];
          // 调用合约函数获取公司数组
          const jewelries = await contract.methods.getMyJewels().call({ from: userAddress });
          console.log('珠宝数组:', jewelries);


          // 更新React组件的状态
          setJewelryData(jewelries);
          setContract(contract);
        } catch (error) {
          console.error('连接到以太坊网络时出错:', error);
        }
      } else {
        console.error('未检测到以太坊提供者');
      }
    };
    connectToWeb3();
    // 清除事件监听器
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const columns = [
    {
      title: 'Jewelry Id',
      dataIndex: 'jewelryId',
      key: 'jewelryId',
      render: (jewelryId, record) => {
        let typeLabel = jewelryId.toString();
        return <span key={record.jewelryId}>{typeLabel}</span>;
      }
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
      render: (manufacturer) => manufacturer.companyName,
    },
    {
      title: 'Transfer',
      key: 'transfer',
      render: (_, record) => (
        <Button onClick={() => handleTransfer(record)}>Transfer</Button>
      ),
    },

  ];

  return (
    <div>
      <div style={{ position: 'relative', fontFamily: 'CustomFont, sans-serif' }}>
        <h1>MyJewelries</h1>
      </div>
      <Modal
        title="MyJewelry"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
      >
        <Form>
          <Form.Item label="Transfer Address" name="transferaddress" rules={[{ required: true, message: 'input your target address' }]}>
            <Input onChange={(e) => setTransferAddress(e.target.value)} value={transferAddress} />
          </Form.Item>
          <Form.Item label="Select Jewelry" name="selectedJewelryId">
            <Select
              value={selectedJewelryId}
              onChange={(value) => setSelectedJewelryId(value)}
            >
              {jewelryData &&
                jewelryData.map((jewelry) => (
                  <Option key={jewelry.jewelryId} value={jewelry.jewelryId}>
                    {jewelry.jewelryId}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={jewelryData}
        rowKey={(record) => record.jewelryId}
      />
    </div>
  );
};

export default MyJewelry;