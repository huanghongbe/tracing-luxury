import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import Web3 from 'web3';
import RawDiamondRegistry from '../abis/RawDiamondRegistry.json'
const GenCutting = () => {
  const [rawDiamondData, setRawDiamondData] = useState([]);
  const [contract, setContract] = useState(null);
  const [rawDiamondName, setRawDiamondName] = useState(null);
  const [rawDiamondColor, setRawDiamondColor] = useState(null);
  const [cuttingGrade, setCuttingGrade] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [choosedRawId, setChoosedRawId] = useState(null);
  const [cuttingModalVisible, setCuttingModalVisible] = useState(false);
  const handleButtonClick = async () => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      setRawDiamondColor(null);
      setRawDiamondName(null);
      setModalVisible(true);

    } catch (error) {
      console.error('rawDiamondRegister 函数调用失败:', error);
    }
  };


  const handleCuttingClick = async (record) => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      setCuttingGrade(null);
      setCuttingModalVisible(true);
      setChoosedRawId(record.rawId);
    } catch (error) {
      console.error('rawDiamondCutting 函数调用失败:', error);
    }
  };

  // const handleCuttingClick = useCallback(async (record) => {
  //   try {
  //     if (!contract) {
  //       console.error('合约实例不存在');
  //       return;
  //     }

  //     const userAddress = window.ethereum.selectedAddress;
  //     await contract.methods.rawDiamondCutting(record.rawId).send({ from: userAddress });
  //     console.log('原石切割成功');
  //     const rawDiamonds = await contract.methods.getAllRawDiamonds().call();
  //     console.log('原石数组:', rawDiamonds);
  //     //更新react组件状态
  //     setRawDiamondData(rawDiamonds);


  //     message.success('原石切割成功');
  //   } catch (error) {
  //     console.error('切割失败:', error);
  //     message.error('切割失败');
  //   }
  // }, [contract, rawDiamondData]);

  const handleModalOk = () => {
    if (rawDiamondName !== null && rawDiamondColor != null) {
      setModalVisible(false);
      handleRegister(rawDiamondName, rawDiamondColor);
    }
  };

  const handleCuttingModalOk = () => {
    if (cuttingGrade !== null && choosedRawId!=null) {
      setModalVisible(false);
      handleCutting(choosedRawId,cuttingGrade);
    }
  };


  const handleCutting = async (choosedRawId, cuttingGrade) => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }

      const userAddress = window.ethereum.selectedAddress;
      await contract.methods.rawDiamondCutting(choosedRawId, cuttingGrade).send({ from: userAddress });
      console.log('原石切割成功');
      const rawDiamonds = await contract.methods.getAllRawDiamonds().call();
      console.log('原石数组:', rawDiamonds);
      //更新react组件状态
      setRawDiamondData(rawDiamonds);


      message.success('原石切割成功');
    } catch (error) {
      console.error('切割失败:', error);
      message.error('切割失败');
    }
  };

  const handleRegister = async (rawDiamondName, rawDiamondColor) => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      //todo rawdiamond加名字参数
      const userAddress = window.ethereum.selectedAddress;

      await contract.methods.rawDiamondRegister(rawDiamondName, rawDiamondColor).send({ from: userAddress });
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
  const handleRawDiamondNameChanged = (value) => {
    setRawDiamondName(value);
  };
  const handleRawDiamondColorChanged = (value) => {
    setRawDiamondColor(value);
  };

  const handleCuttingGradeChanged = (value) => {
    setCuttingGrade(value);
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
      title: 'Raw Diamond Name',
      dataIndex: 'rawDiamondName',
      key: 'rawDiamondName',
    },
    {
      title: 'Raw Diamond Color',
      dataIndex: 'rawDiamondColor',
      key: 'rawDiamondColor',
    },
    {
      title: 'Mining Company',
      dataIndex: 'miningCompany',
      key: 'miningCompanyName',
      render: (miningCompany) => miningCompany.companyName,
    },
    {
      title: 'Cutting Company',
      dataIndex: 'cuttingCompany',
      key: 'cuttingCompanyName',
      render: (cuttingCompany) => cuttingCompany.companyName,
    },
    {
      title: 'Cutting Grade',
      dataIndex: 'cuttingGrade',
      key: 'cuttingGrade',
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
        title="Raw Diamond Cutting"
        open={cuttingModalVisible}
        onCancel={() => setCuttingModalVisible(false)}
        onOk={handleCuttingModalOk}>
        <Form>
          <Form.Item label="cuttingGrade" name="cuttingGrade" rules={[{ required: true, message: 'input your raw diamond color' }]}>
            <Input onChange={(e) => handleCuttingGradeChanged(e.target.value)} value={cuttingGrade} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Raw Diamond Register"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
      >
        <Form>
          <Form.Item label="name" name="name" rules={[{ required: true, message: 'input your raw diamond name' }]}>
            <Input onChange={(e) => handleRawDiamondNameChanged(e.target.value)} value={rawDiamondName} />
          </Form.Item>
          <Form.Item label="color" name="color" rules={[{ required: true, message: 'input your raw diamond color' }]}>
            <Input onChange={(e) => handleRawDiamondColorChanged(e.target.value)} value={rawDiamondColor} />
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