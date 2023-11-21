
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, InputNumber, Form, message, Select } from 'antd';
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
      setDiamondInput(null); // 重置选中的公司类型
      setScoreInput(null);
      setModalVisible(true); // 打开下拉框弹窗
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
        console.error('合约实例不存在');
        return;
      }
      console.log(diamondInput)
      console.log(scoreInput)

      const parsedDiamondInput = parseInt(diamondInput, 10);
      const parsedScore = parseInt(scoreInput, 10);
      if (isNaN(parsedDiamondInput) || isNaN(parsedScore)) {
        console.log(parsedDiamondInput)
        console.log(parsedScore)
        console.error('输入无效');
        return;
      }

      const userAddress = window.ethereum.selectedAddress;
      await contract.methods.diamondRegister(parsedDiamondInput, clarity, parsedScore).send({ from: userAddress });

      console.log('钻石注册成功');
      // 更新公司数据或执行其他操作
      const diamonds = await contract.methods.getAllDiamonds().call();
      console.log('钻石数组:', diamonds);
      // 更新react组件状态
      setDiamondData(diamonds);
      // message.success('钻石注册成功');
      //emojitrue
      setShowEmoji(true);
    } catch (error) {
      console.error('注册失败:', error);
      message.error('钻石注册失败');
      setDiamondInput(null);
      setScoreInput(null);
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

  ];

  return (
    <div>
      <div style={{ position: 'relative', fontFamily: 'CustomFont, sans-serif' }}>
        <Button
          style={{ position: 'absolute', top: '5px', right: '150px', fontFamily: 'CustomFont, sans-serif' }}
          onClick={handleButtonClick}
        >
          register&grading
        </Button>
        <h1>Diamonds</h1>
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
          handleEmojiModalOk();}}
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
      <Table
        columns={columns}
        dataSource={diamondData}
        rowKey={(record) => record.rawId}
      />
    </div>
  );
};

export default DiamondRegistry;