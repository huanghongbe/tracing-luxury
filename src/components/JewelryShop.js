import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Input, message } from 'antd';
import Web3 from 'web3';
import { animated } from 'react-spring';
import '../global.css'
import JewelryShopABI from '../abis/JewelryShop.json'
const JewelryShop = () => {
  const [jewelryData, setJewelryData] = useState(null);
  const [contract, setContract] = useState(null);
  const [jewelryInput, setJewelryInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
 
  //emoji
  const [showEmoji, setShowEmoji] = useState(false);
  const [emoji, setEmoji] = useState('🤩');

  const springProps = ({
    to: { top: emoji ? '50px' : '-100px' },
    from: { top: '-100px' },
  });

  const handleEmojiModalOk = () => {
    setShowEmoji(false);
  };
  //

  const handleButtonClick = async () => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      setJewelryInput(null);
      setModalVisible(true);
    } catch (error) {
      console.error('diamondDesigning函数调用失败:', error);
    }
  };
  const handleModalOk = () => {

    setModalVisible(false);
    handleRegister(jewelryInput, priceInput);
  };
  const handleRegister = async () => {
    try {
      // 确保合约实例存在
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      console.log(jewelryInput)
      console.log(priceInput)
      // 获取当前用户的账户地址
      const userAddress = window.ethereum.selectedAddress;
      // 调用合约的 companyRegister 函数
      await contract.methods.diamondDesigning(jewelryInput, priceInput).send({ from: userAddress });
      // 注册成功后的处理逻辑
      console.log('钻石设计成功');
      // 更新公司数据或执行其他操作
      const jewelries = await contract.methods.getAllJewels().call();
      console.log('珠宝数组:', jewelries);
      //更新react组件状态
      setJewelryData(jewelries);
      //emojitrue
      setShowEmoji(true);
    } catch (error) {
      console.error('注册失败:', error);
    }
  };
  const handlePurchase = async (record) => {
    try {
      // 确保合约实例存在
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      const web3 = new Web3(window.ethereum);
      // 获取当前用户的账户地址
      const userAddress = window.ethereum.selectedAddress;
      // 获取珠宝的价格（以太币单位）
      const jewelryPriceInEth = record.price;
      // 将以太币的值作为 wei 单位传递给支付函数
      const jewelryPriceInWei = web3.utils.toWei(jewelryPriceInEth.toString(), 'ether');
      // 调用合约的支付函数进行付款
      await contract.methods.jewelryPurchase(record.jewelryId).send({ from: userAddress, value: jewelryPriceInWei });
      // 支付成功后的处理逻辑
      console.log('购买成功');
      // 更新公司数据或执行其他操作
      const jewelries = await contract.methods.getAllJewels().call();
      console.log('珠宝数组:', jewelries);
      // 更新React组件的状态
      setJewelryData(jewelries);
      message.success('购买成功');
    } catch (error) {
      console.error('购买失败:', error);
      message.error('购买失败');
    }
  };

  useEffect(() => {
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
          // 调用合约函数获取公司数组
          const jewelries = await contract.methods.getAllJewels().call();
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
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) => {
        let typeLabe = price.toString();
        return <span key={record.price}>{typeLabe}</span>;
      }
    },
    {
      title: 'Purchase',
      key: 'purchase',
      render: (_, record) => (
        <Button onClick={() => handlePurchase(record)}>Purchase</Button>
      ),
    },

  ];

  return (
    <div>
      <div style={{ position: 'relative', fontFamily: 'CustomFont, sans-serif' }}>
        <Button
          style={{ position: 'absolute', top: '5px', right: '150px',fontFamily: 'CustomFont, sans-serif' }}
          onClick={handleButtonClick}
        >
          register
        </Button>
        <h1>Jewelries</h1>
        {showEmoji && (
      <animated.div className="emoji-icon" style={springProps}>
      {emoji}
    </animated.div>
    )}
      </div>
      <Modal
        title="Jewelry Designer"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        // onOk={handleModalOk}
        onOk={() => {
          handleModalOk();
          handleEmojiModalOk();}}
      >
        <Form>
          <Form.Item label="Diamond Id" name="diamondId" rules={[{ required: true, message: 'input your jewelry id' }]}>
            <Input onChange={(e) => setJewelryInput(e.target.value)} value={jewelryInput} />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Input the price' }]}>
            <Input onChange={(e) => setPriceInput(e.target.value)} value={priceInput} />
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

export default JewelryShop;