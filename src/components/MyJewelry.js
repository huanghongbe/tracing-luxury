// import React from 'react';

// const MyJewelry = () => {
//   return <div>我的珠宝的内容</div>;
// };

// export default MyJewelry;
import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Input, message } from 'antd';
import Web3 from 'web3';
import JewelryShopABI from '../abis/JewelryShop.json'
const JewelryShop = () => {
  const [jewelryData, setJewelryData] = useState(null);
  const [contract, setContract] = useState(null);
  const [jewelryInput, setJewelryInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // const [pagination, setPagination] = useState({
  //   pageSize: 10, // 每页显示10条数据
  // });
  const handleButtonClick = async () => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }

      // 添加以下代码
      setJewelryInput(null);
      setModalVisible(true); // 打开下拉框弹窗
    } catch (error) {
      console.error('diamondDesigning函数调用失败:', error);
    }
  };
  // const handlePurchase = async (record) => {
  //   try {
  //     const{ jewelryId, price} = record;
  //     // 确保合约实例存在
  //     if (!contract) {
  //       console.error('合约实例不存在');
  //       return;
  //     }

  //     // 获取当前用户的账户地址和price
  //     const userAddress = window.ethereum.selectedAddress;
  //     // 调用合约的 jewelryPurchase 函数
  //     await contract.methods.jewelryPurchase(jewelryId).send({ from: userAddress, value: price });

  //     // 购买成功后的处理逻辑
  //     console.log('珠宝购买成功');

  //     // 更新公司数据或执行其他操作
  //     const jewelries = await contract.methods.getAllJewels().call();
  //     console.log('珠宝数组:', jewelries);

  //     // 更新React组件的状态
  //     setJewelryData(jewelries);

  //     // 弹出成功消息
  //     message.success('珠宝购买成功');
  //   } catch (error) {
  //     console.error('购买失败:', error);

  //     // 弹出错误消息
  //     message.error('购买失败');
  //   }
  // };
  const handleModalOk = () => {

    setModalVisible(false);
    handleRegister(jewelryInput, priceInput);
  };
  const handleRegister = async (jewelryInput, priceInput) => {
    try {
      // 确保合约实例存在
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }

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
      // window.location.reload();

    } catch (error) {
      console.error('注册失败:', error);
    }
  };
  const handlePurchase = async (record) => {
    try {

      console.log("priceeeeeeeeeeee",record)
      const { jewelryId, price } = record;

  
      const userAddress = window.ethereum.selectedAddress;
      const web3 = new Web3(window.ethereum);
      // 调用合约的 jewelryPurchase 函数
      // 用户输入的以太币金额
      const ethUnit = 100; // 10^18，ETH 单位的 Wei 值

      const inputWeiAmount = web3.utils.toWei(price).mul(ethUnit);
      console.log("inpppppppppppppppp",inputWeiAmount)
      await contract.methods.jewelryPurchase(jewelryId).send({ from: userAddress, value: inputWeiAmount });

      // 购买成功后的处理逻辑
      console.log('珠宝购买成功');

      // 更新公司数据或执行其他操作
      const jewelries = await contract.methods.getAllJewels().call();
      console.log('珠宝数组:', jewelries);

      // 更新React组件的状态
      setJewelryData(jewelries);

      // 弹出成功消息
      message.success('珠宝购买成功');
    } catch (error) {
      console.error('购买失败:', error);

      // 弹出错误消息
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
      <div style={{ position: 'relative' }}>
        <Button
          style={{ position: 'absolute', top: '5px', right: '150px' }}
          onClick={handleButtonClick}
        >
          register
        </Button>
        <h1>Jewelries</h1>
      </div>
      <Modal
        title="Jewelry Designer"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
      >
        <Form>
          <Form.Item label="JewelryId" name="jewelryId" rules={[{ required: true, message: 'input your jewelry id' }]}>
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