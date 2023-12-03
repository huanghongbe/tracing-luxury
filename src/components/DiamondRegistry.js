import React, { useEffect, useState } from 'react';
import { Spin, Table, Button, Modal, Input, InputNumber, Form, message, Select } from 'antd';
import Web3 from 'web3';
import { animated } from 'react-spring';
import '../global.css'
import DiamondRegistryABI from '../abis/DiamondRegistry.json'
const DiamondRegistry = () => {
  const [diamondData, setDiamondData] = useState([]);
  const [contract, setContract] = useState(null);
  const [diamondInput, setDiamondInput] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [scoreInput, setScoreInput] = useState(null);
  const [clarity, setClarity] = useState(null);

  //emoji
  const [showEmoji, setShowEmoji] = useState(false);
  const [emoji, setEmoji] = useState('💎');
  const [isLoading, setIsLoading] = useState(false);

  const springProps = ({
    to: { top: emoji ? '50px' : '-100px' },
    from: { top: '-100px' },
  });

  const handleEmojiModalOk = () => {
    setShowEmoji(false);
  };
  //

  const handleClarityChanged = (value) => {
    setClarity(value);
  };
  const handleButtonClick = async () => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      setDiamondInput(null);
      setScoreInput(null);
      setModalVisible(true);
    } catch (error) {
      console.error('DiamondRegister 函数调用失败:', error);
    }
  };

  const handleModalOk = () => {
    if (diamondInput !== null && scoreInput !== null && clarity != null) {
      setModalVisible(false);
      handleRegister(diamondInput, scoreInput, clarity);
    }
  };

  const handleRegister = async (diamondInput, scoreInput, clarity) => {
    try {
      if (!contract) {
        console.error('Contract instance does not exist');
        return;
      }
      setIsLoading(true);
      console.log(diamondInput)
      console.log(scoreInput)

      const parsedDiamondInput = parseInt(diamondInput, 10);
      const parsedScore = parseInt(scoreInput, 10);
      if (isNaN(parsedDiamondInput) || isNaN(parsedScore)) {
        console.log(parsedDiamondInput)
        console.log(parsedScore)
        console.error('invalid input');
        return;
      }

      const userAddress = window.ethereum.selectedAddress;
      await contract.methods.diamondRegister(parsedDiamondInput, clarity, parsedScore).send({ from: userAddress });

      console.log('diamond registry success');
      const diamonds = await contract.methods.getAllDiamonds().call();
      console.log('diamond array:', diamonds);
      setDiamondData(diamonds);
      //emojitrue
      setShowEmoji(true);
    } catch (error) {
      console.error('diamond registry failed:', error);
      message.error('diamond registry failed');
      setDiamondInput(null);
      setScoreInput(null);
    } finally{
      setIsLoading(false);
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
          const deployedNetwork = DiamondRegistryABI.networks[networkId];
          const contract = new web3.eth.Contract(
            DiamondRegistryABI.abi,
            deployedNetwork && deployedNetwork.address
          );

          // 调用合约函数获取公司数组
          const diamonds = await contract.methods.getAllDiamonds().call();
          console.log('钻石数组:', diamonds);

          // 更新React组件的状态
          setDiamondData(diamonds);
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
      title: 'Diamond Id',
      dataIndex: 'uniqueId',
      key: 'uniqueId',
      render: (uniqueId, record) => {
        let typeLabel = uniqueId.toString();
        return <span key={record.uniqueId}>{typeLabel}</span>;
      }
    },
    {
      title: 'Raw Diamond Id',
      dataIndex: 'rawDiamond',
      key: 'rawDiamond',
      render: (rawDiamond) => {
        let typeLabel = rawDiamond.rawId.toString();
        return <span key={rawDiamond}>{typeLabel}</span>;
      }
    },
    {
      title: 'Grading Lab',
      dataIndex: 'gradingLab',
      key: 'gradingLab',
      render: (gradingLab) => gradingLab.companyName,
    },
    {
      title: 'Clarity',
      dataIndex: 'clarity',
      key: 'clarity'
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade) => {
        let typeLabel = grade.toString();
        return <span key={grade}>{typeLabel}</span>;
      }
    },
    {
      title: 'Grading Time',
      dataIndex: 'registerTime',
      key: 'registerTime',
      render: (registerTime) => {
        if (registerTime) {
          const registerTimeNumber = Number(registerTime); // 显式将 minedTime 转换为 Number 类型
          const dateTime = new Date(registerTimeNumber * 1000); // 将时间戳转换为 JavaScript 的 Date 对象
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
    }

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
            Diamonds
          </h1>
          <Button className="register-button" onClick={handleButtonClick}>
            Register&Grading
          </Button>
        </div>
        {showEmoji && (
          <animated.div className="emoji-icon" style={springProps}>
            {emoji}
          </animated.div>
        )}
      </div>
      <Modal
        title="Diamond Register"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        // onOk={handleModalOk}
        onOk={() => {
          handleModalOk();
          handleEmojiModalOk();
        }}
      >
        <Form>
          <Form.Item label="RawId" name="rawId" rules={[{ required: true, message: 'input the raw dimond id' }]}>
            <Input onChange={(e) => setDiamondInput(e.target.value)} value={diamondInput} />
          </Form.Item>

          <Form.Item label="Clarity" name="clarity" rules={[{ required: true, message: 'input the clarity' }]}>
            <Select
              style={{ width: '100%', fontFamily: 'CustomFont, sans-serif' }}
              value={clarity}
              onChange={handleClarityChanged}>
              <Select.Option value="Flawless">Flawless</Select.Option>
              <Select.Option value="Internally Flawless">Internally Flawless</Select.Option>
              <Select.Option value="Very Slightly Included">Very Slightly Included</Select.Option>
              <Select.Option value="Slightly Included ">Slightly Included </Select.Option>
              <Select.Option value="Included">Included</Select.Option>
            </Select>
          </Form.Item>


          <Form.Item label="Score" name="score" rules={[{ required: true, message: 'Input the diamond score' }]}>
            <InputNumber onChange={(value) => setScoreInput(value)} value={scoreInput} />
          </Form.Item>

        </Form>
      </Modal>
      {diamondData.length > 0 && (<Table
        columns={columns}
        dataSource={diamondData}
        rowKey={(record) => record.rawId}
        className="custom-table"
      />
      )}
    </div>
  );
};

export default DiamondRegistry;