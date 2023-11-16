import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import Web3 from 'web3';
import RawDiamondRegistry from '../abis/RawDiamondRegistry.json'
const GenCutting = () => {
  const [rawDiamondData, setRawDiamondData] = useState([]);
  const [contract, setContract] = useState(null);
  const [rawDiamondInput, setRawDiamondInput] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleButtonClick = async () => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      setRawDiamondInput(null); // 重置选中的公司类型
      setModalVisible(true); // 打开下拉框弹窗
    } catch (error) {
      console.error('rawDiamondRegister 函数调用失败:', error);
    }
  };
  
  const handleCuttingClick = useCallback(async (record) => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
  
      const userAddress = window.ethereum.selectedAddress;
      await contract.methods.rawDiamondCutting(record.rawId).send({ from: userAddress });
      console.log('原石切割成功');
  
      // Update the cutting company for the selected raw diamond
      const updatedRawDiamondData = rawDiamondData.map((diamond) => {
        if (diamond.rawId === record.rawId) {
          return { ...diamond, cuttingCompany: userAddress };
        }
        return diamond;
      });
  
      setRawDiamondData(updatedRawDiamondData);
  
      message.success('原石切割成功');
    } catch (error) {
      console.error('切割失败:', error);
      message.error('切割失败');
    }
  }, [contract, rawDiamondData]);
  
  const handleModalOk = () => {
    if (rawDiamondInput !== null) {
      setModalVisible(false);
      handleRegister(rawDiamondInput);
    }
  };
  // const handleRegister = async (rawDiamondInput) => {
  //   try {
  //     if (!contract) {
  //       console.error('合约实例不存在');
  //       return;
  //     }
  //     //todo rawdiamond加名字参数
  //     const userAddress = window.ethereum.selectedAddress;
  //     await contract.methods.rawDiamondRegister().send({ from: userAddress });
  //     console.log('原石注册成功');
  //     // 更新公司数据或执行其他操作
  //     const rawDiamonds = await contract.methods.getAllRawDiamonds().call();
  //     console.log('原石数组:', rawDiamonds);
  //     //更新react组件状态
  //     setRawDiamondData(rawDiamonds);
  //     // window.location.reload();
  //   } catch (error) {
  //     console.error('注册失败:', error);
  //   }
  // };
  const handleRegister = async (rawDiamondInput) => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      //todo rawdiamond加名字参数
      const userAddress = window.ethereum.selectedAddress;
      await contract.methods.rawDiamondRegister().send({ from: userAddress });
      console.log('原石注册成功');
      // 更新公司数据或执行其他操作
      const rawDiamonds = await contract.methods.getAllRawDiamonds().call();
      console.log('原石数组:', rawDiamonds);
      //更新react组件状态
      setRawDiamondData(rawDiamonds);
      message.success('原石注册成功');
    } catch (error) {
      console.error('注册失败:', error);
      message.error('原石注册失败');
    }
  };
  const handleInputChange = (value) => {
    setRawDiamondInput(value);
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
          const deployedNetwork = RawDiamondRegistry.networks[networkId];
          const contract = new web3.eth.Contract(
            RawDiamondRegistry.abi,
            deployedNetwork && deployedNetwork.address
          );

          // 调用合约函数获取公司数组
          const rawDiamonds = await contract.methods.getAllRawDiamonds().call();
          console.log('原石数组:', rawDiamonds);

          // 更新React组件的状态
          setRawDiamondData(rawDiamonds);
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
      title: 'Raw Id',
      dataIndex: 'rawId',
      key: 'rawId',
      render: (rawId, record) => {
        let typeLabel = rawId.toString();
        return <span key={record.rawId}>{typeLabel}</span>;
      }
    },
    {
      title: 'Mining Company',
      dataIndex: 'miningCompany',
      key: 'miningCompany',
    },
    {
      title: 'Cutting Company',
      dataIndex: 'cuttingCompany',
      key: 'cuttingCompany',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleCuttingClick(record)}>Cutting</Button>
      ),
    },
  ];

  return (


    <div>
      <div style={{ position: 'relative', fontFamily: 'CustomFont, sans-serif' }}>
        <Button
          style={{ position: 'absolute', top: '5px', right: '150px', fontFamily: 'CustomFont, sans-serif' }}
          onClick={handleButtonClick}
        >
          register
        </Button>
        <h1>Raw Diamonds</h1>
      </div>
      <Modal
        title="Raw Diamond Register"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
      >
        <Form>
          <Form.Item label="name" name="name" rules={[{ required: true, message: 'input your raw diamond name' }]}>
            <Input onChange={handleInputChange} value={rawDiamondInput} />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={rawDiamondData}
        rowKey={(record) => record.rawId}
      />
    </div>
  );
};

export default GenCutting;