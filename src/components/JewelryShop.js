import React, { useEffect, useState } from 'react';
import { Spin, Image, Button, Form, Modal, Input, message, Card, Pagination } from 'antd';
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
  const [userAddress, setUserAddress] = useState(null);
  //emoji
  const [showEmoji, setShowEmoji] = useState(false);
  const [emoji, setEmoji] = useState('🤩');
  //page
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      console.log(jewelryInput)
      console.log(priceInput)
      const userAddress = window.ethereum.selectedAddress;
      await contract.methods.diamondDesigning(jewelryInput, priceInput).send({ from: userAddress });
      console.log('钻石设计成功');
      const jewelries = await contract.methods.getAllJewels().call();
      console.log('珠宝数组:', jewelries);
      setJewelryData(jewelries);
      //emojitrue
      setShowEmoji(true);
    } catch (error) {
      console.error('注册失败:', error);
    } finally{
      setIsLoading(false);
    }
  };
  const handlePurchase = async (record) => {
    try {
      // 确保合约实例存在
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }
      setIsLoading(true);
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
    } finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {

    // 监听账户变化
    const handleAccountsChanged = async (accounts) => {

      const userAddress = accounts[0];
      console.log('账户变化:', accounts)
      setUserAddress(userAddress)
      console.log('刷新页面') // 刷新页面并保持在当前页面
      // window.location.reload();
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
          // 调用合约函数获取公司数组
          const jewelries = await contract.methods.getAllJewels().call();
          console.log('珠宝数组:', jewelries);
          const accounts = await web3.eth.getAccounts();
          setUserAddress(accounts[0]);
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

  const renderPagination = () => {
    if (!jewelryData || jewelryData.length === 0) {
      return null; // 当没有数据时不渲染分页组件
    }
  
    return (
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={jewelryData.length}
        onChange={handlePageChange}
      />
    );
  };

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
      title: 'Action',
      key: 'purchase',
      render: (_, record) => {
        if (!record.beingSold || record.owner === userAddress) {
          return <Button disabled>Purchase</Button>;
        } else {
          return <Button onClick={() => handlePurchase(record)}>Purchase</Button>;
        }
      }

    },

  ];

  //page
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const renderJewelryData = () => {
    if (!jewelryData) {
      return null;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentJewelryData = jewelryData.slice(startIndex, endIndex);
    console.log(jewelryData.designTime);

    return currentJewelryData.map((record) => (
      <Card className="jewelry-card" key={record.jewelryId} >
        <div style={{ textAlign: 'center' }}>
          <Image
            src={require('../assets/0000000.jpg')}
            alt="Diamond"
            style={{ height: '100' }}
          />
        </div>
        <p>Details</p>
        <div style={{ border: '1px dashed #000', padding: '10px' }}>
          <p>{`Jewelry ID: ${record.jewelryId}`}</p>
          <p>{`Manufacturer: ${record.manufacturer.companyName}`}</p>
          <p>{`Design Time: ${
      record.designTime
        ? new Date(Number(record.designTime) * 1000).toLocaleString()
        : 'N/A'
    }`}</p>
          <p title={record.owner}>{`Owner: ${record.owner.slice(0, 16)}...`}</p>
          <p>{`Price: ${record.price}`}</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {(!record.beingSold || record.owner === userAddress) ? (
              <Button className="card-button" disabled>Purchase</Button>
            ) : (
              <Button className="card-button" onClick={() => handlePurchase(record)}>Purchase</Button>
            )}
          </div>
        </div>

      </Card>
    ));
  };

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
            Jewelries
          </h1>
          <Button
            className="register-button"
            style={{
              marginBottom: '2px',
              fontFamily: 'CustomFont, sans-serif',
            }}
            onClick={handleButtonClick}
          >
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
        title="Jewelry Designer"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        // onOk={handleModalOk}
        onOk={() => {
          handleModalOk();
          handleEmojiModalOk();
        }}
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
      <div className="card-container">{renderJewelryData()}</div>
      <div className="pagination-container">
        {/* <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={jewelryData ? jewelryData.length : 0}
          onChange={handlePageChange}
        /> */}
         {renderPagination()}
      </div>
    </div>
  );
};

export default JewelryShop;