import React, { useEffect, useState } from 'react';
import { Table, Button, Select, Modal, Input, Form } from 'antd';
import Web3 from 'web3';
import '../global.css'
import CompanyRegistryABI from '../abis/CompanyRegistry.json'
const CompanyRegistry = () => {
  const [companyData, setCompanyData] = useState([]);
  const [contract, setContract] = useState(null);
  const [selectedCompanyType, setSelectedCompanyType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    pageSize: 10, // 每页显示10条数据
  });


  const handleButtonClick = async () => {
    try {
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }

      // 添加以下代码
      setCompanyName(null);
      setSelectedCompanyType(null); // 重置选中的公司类型
      setModalVisible(true); // 打开下拉框弹窗
    } catch (error) {
      console.error('companyRegister 函数调用失败:', error);
    }
  };
  const handleModalOk = () => {
    if (selectedCompanyType !== null && companyName !== null) {
      setModalVisible(false);
      handleRegister(selectedCompanyType, companyName);
      form.resetFields();
    }
  };
  const handleRegister = async (companyType, companyName) => {
    try {
      // 确保合约实例存在
      if (!contract) {
        console.error('合约实例不存在');
        return;
      }

      // 获取当前用户的账户地址
      const userAddress = window.ethereum.selectedAddress;
      // 调用合约的 companyRegister 函数
      await contract.methods.companyRegister(companyType, companyName).send({ from: userAddress });

      // 注册成功后的处理逻辑
      console.log('公司注册成功');

      // 更新公司数据或执行其他操作
      const companies = await contract.methods.getAllCompanies().call();
      console.log('公司数组:', companies);
      //更新react组件状态
      setCompanyData(companies);
      // window.location.reload();

    } catch (error) {
      console.error('注册失败:', error);
    }
  };
  const handleCompanyTypeChange = (value) => {
    setSelectedCompanyType(value);
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
          const deployedNetwork = CompanyRegistryABI.networks[networkId];
          const contract = new web3.eth.Contract(
            CompanyRegistryABI.abi,
            deployedNetwork && deployedNetwork.address
          );

          // 调用合约函数获取公司数组
          const companies = await contract.methods.getAllCompanies().call();
          console.log('公司数组:', companies);

          // 更新React组件的状态
          setCompanyData(companies);
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
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Addr',
      dataIndex: 'addr',
      key: 'addr',
    },
    {
      title: 'Company Type',
      dataIndex: 'companyType',
      key: 'companyType',
      render: (companyType, record) => {
        let typeLabel = '';

        switch (companyType.toString()) {
          case '0':
            typeLabel = 'Mining';
            break;
          case '1':
            typeLabel = 'Cutting';
            break;
          case '2':
            typeLabel = 'Grading';
            break;
          case '3':
            typeLabel = 'Manufacturer';
            break;
          default:
            typeLabel = '';
            break;
        }

        return <span key={record.companyId}>{typeLabel}</span>;
      },
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
        <h1>Companies</h1>
      </div>
      <Modal
        title="enter your company information"
        open={modalVisible}
        onCancel={() => {
          form.resetFields();
          setModalVisible(false);
        }}
        onOk={handleModalOk}
      >
        <Form form={form}>
          <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: 'input your company name' }]}>
            <Input onChange={(e) => setCompanyName(e.target.value)} value={companyName} />
          </Form.Item>
          <Form.Item label="Company Type" name="companyType" rules={[{ required: true, message: 'select your company type' }]}>
            <Select
              style={{ width: '100%', fontFamily: 'CustomFont, sans-serif' }}
              value={selectedCompanyType}
              onChange={handleCompanyTypeChange}>
              <Select.Option value="0">Mining</Select.Option>
              <Select.Option value="1">Cutting</Select.Option>
              <Select.Option value="2">Grading</Select.Option>
              <Select.Option value="3">Manufacturer</Select.Option>
            </Select>
          </Form.Item>
        </Form>

      </Modal>

      <Table
        columns={columns}
        dataSource={companyData}
        rowKey={(record) => record.companyId}
        pagination={true}
        onChange={(pagination, filters, sorter) => {
          setPagination(pagination);
        }}
        className="custom-table"
      >
      </Table>
    </div>
  );
};

export default CompanyRegistry;