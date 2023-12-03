import React, { useEffect, useState } from 'react';
import { Spin, Table, Button, Modal, Input, Form, message, Select } from 'antd';
import Web3 from 'web3';
import { animated } from 'react-spring';
import '../global.css'
import RawDiamondRegistryABI from '../abis/RawDiamondRegistry.json'
const RawDiamondRegistry = () => {
  const [rawDiamondData, setRawDiamondData] = useState([]);
  const [contract, setContract] = useState(null);
  const [rawDiamondName, setRawDiamondName] = useState(null);
  const [rawDiamondColor, setRawDiamondColor] = useState(null);
  const [cuttingGrade, setCuttingGrade] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [choosedRawId, setChoosedRawId] = useState(null);
  const [cuttingModalVisible, setCuttingModalVisible] = useState(false);

  //emoji
  const [showEmoji, setShowEmoji] = useState(false);
  const [emoji, setEmoji] = useState('🪨');
  const [isLoading, setIsLoading] = useState(false);

  const springProps = ({
    to: { top: emoji ? '50px' : '-100px' },
    from: { top: '-100px' },
  });

  const handleEmojiModalOk = () => {
    setShowEmoji(false);
  };

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

  const handleModalOk = () => {
    if (rawDiamondName !== null && rawDiamondColor != null) {
      setModalVisible(false);
      handleRegister(rawDiamondName, rawDiamondColor);
    }
  };

  const handleCuttingModalOk = () => {
    if (cuttingGrade !== null && choosedRawId != null) {
      setCuttingModalVisible(false);
      handleCutting(choosedRawId, cuttingGrade);
    }
  };


  const handleCutting = async (choosedRawId, cuttingGrade) => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      setIsLoading(true);

      const userAddress = window.ethereum.selectedAddress;
      await contract.methods.rawDiamondCutting(choosedRawId, cuttingGrade).send({ from: userAddress });
      console.log('原石切割成功');
      const rawDiamonds = await contract.methods.getAllRawDiamonds().call();
      console.log('原石数组:', rawDiamonds);
      //更新react组件状态
      setRawDiamondData(rawDiamonds);


      message.success('Cutting successfully!🎉');
    } catch (error) {
      console.error('切割失败:', error);
      message.error('Cutting failed');
    } finally{
      setIsLoading(false);
    }
  };

  const handleRegister = async (rawDiamondName, rawDiamondColor) => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      setIsLoading(true);
      //todo rawdiamond加名字参数
      const userAddress = window.ethereum.selectedAddress;
      await contract.methods.rawDiamondRegister(rawDiamondName, rawDiamondColor).send({ from: userAddress });
      console.log('原石注册成功');
      const rawDiamonds = await contract.methods.getAllRawDiamonds().call();
      console.log('原石数组:', rawDiamonds);
      //更新react组件状态
      setRawDiamondData(rawDiamonds);
      //emojitrue
      setShowEmoji(true);
      // message.success('原石注册成功');
    } catch (error) {
      console.error('注册失败:', error);
      message.error('Registry failed');
    } finally{
      setIsLoading(false);
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
          const deployedNetwork = RawDiamondRegistryABI.networks[networkId];
          const contract = new web3.eth.Contract(
            RawDiamondRegistryABI.abi,
            deployedNetwork && deployedNetwork.address
          );
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
      title: 'Mined Time',
      dataIndex: 'minedTime',
      key: 'minedTime',
      render: (minedTime) => {
        if (minedTime) {
          const minedTimeNumber = Number(minedTime); 
          const dateTime = new Date(minedTimeNumber * 1000); 
          const year = dateTime.getFullYear(); 
          const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); 
          const day = dateTime.getDate().toString().padStart(2, '0'); 
          const hours = dateTime.getHours().toString().padStart(2, '0'); 
          const minutes = dateTime.getMinutes().toString().padStart(2, '0'); 
          const seconds = dateTime.getSeconds().toString().padStart(2, '0'); 
          const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          return <span>{formattedDateTime}</span>;
        } else {
          return <span>N/A</span>;
        }
      },
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
      title: 'Cutting Time',
      dataIndex: 'cuttingTime',
      key: 'cuttingTime',
      render: (cuttingTime) => {
        if (cuttingTime) {
          const cuttingTimeNumber = Number(cuttingTime); // 显式将 minedTime 转换为 Number 类型
          const dateTime = new Date(cuttingTimeNumber * 1000); // 将时间戳转换为 JavaScript 的 Date 对象
          const year = dateTime.getFullYear(); // 获取年份
          const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // 获取月份（加1，因为月份从0开始，然后使用padStart补零）
          const day = dateTime.getDate().toString().padStart(2, '0'); // 获取日期
          const hours = dateTime.getHours().toString().padStart(2, '0'); // 获取小时
          const minutes = dateTime.getMinutes().toString().padStart(2, '0'); // 获取分钟
          const seconds = dateTime.getSeconds().toString().padStart(2, '0'); // 获取秒钟
          const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          return <span>{formattedDateTime}</span>;
        } else {
          return <span>N/A</span>;
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        if (record.cuttingGrade !== undefined && record.cuttingGrade !== null && record.cuttingGrade !== '') {
          return (
            <Button disabled>Cutting</Button>
          );
        } else {
          return (
            <Button onClick={() => handleCuttingClick(record)}>Cutting</Button>
          );
        }
      }
    },
  ];

  return (
    <div>
       {isLoading && (
        <div className="loading-container">
          <Spin size="large" tip="Loading..."/>
          </div>
      )}
      <div style={{ position: 'relative', fontFamily: 'CustomFont, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ marginBottom: '20px', color: '#EAEE4A' }}>
            Raw Diamonds
          </h1>
          <Button className="register-button" onClick={handleButtonClick}>
            Register
          </Button>
        </div>
        {showEmoji && (
          <animated.div className="emoji-icon" style={springProps}>
            {emoji}
          </animated.div>
        )}
      </div>
      <Modal
        title="Raw Diamond Cutting"
        open={cuttingModalVisible}
        onCancel={() => setCuttingModalVisible(false)}
        onOk={handleCuttingModalOk}>
        <Form>
          <Form.Item label="Cutting Grade" name="cuttingGrade" rules={[{ required: true, message: 'input your raw diamond color' }]}>
            <Select
              style={{ width: '100%', fontFamily: 'CustomFont, sans-serif' }}
              value={cuttingGrade}
              onChange={handleCuttingGradeChanged}>
              <Select.Option value="Perfect Cut">Perfect Cut</Select.Option>
              <Select.Option value="Very Good Cut">Very Good Cut</Select.Option>
              <Select.Option value="Good Cut">Good Cut</Select.Option>
              <Select.Option value="Fair Cut">Fair Cut</Select.Option>
              <Select.Option value="Poor Cut">Poor Cut</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Raw Diamond Register"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        // onOk={handleModalOk}
        onOk={() => {
          handleModalOk();
          handleEmojiModalOk();
        }}
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
      {rawDiamondData.length > 0 && (<Table
        columns={columns}
        dataSource={rawDiamondData}
        rowKey={(record) => record.rawId}
        className="custom-table"
      />
      )}
    </div>
  );
};

export default RawDiamondRegistry;