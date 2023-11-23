import React, { useState, useEffect } from 'react';
import { Input, Button, message, Modal } from 'antd';
import Web3 from 'web3';
import JewelryShopABI from '../abis/JewelryShop.json';
import '../global.css';
import { JsonToTable } from "react-json-to-table";
const JewelryVerification = () => {
  const [jewelryId, setJewelryId] = useState('');
  const [jewelryInfo, setJewelryInfo] = useState(null);
  const [contract, setContract] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    initializeContract();
  }, []);

  const initializeContract = async () => {
    try {
      // Check if Web3 provider is available
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        // Get the deployed contract address from the ABI
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = JewelryShopABI.networks[networkId];
        if (!deployedNetwork) {
          throw new Error('Contract not deployed on the current network');
        }
        const contractAddress = deployedNetwork.address;

        // Create contract instance
        const contract = new web3.eth.Contract(JewelryShopABI.abi, contractAddress);
        setContract(contract);
      } else {
        throw new Error('Web3 provider not detected');
      }
    } catch (error) {
      console.error('Failed to initialize contract', error);
      message.error('Failed to initialize contract. Please try again.');
    }
  };

  const handleVerify = async () => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }
      setIsModalVisible(true);
      const result = await contract.methods.jewelryVerify(jewelryId).call();
      // setJewelryInfo(result);
      console.log(result);
      //直接获取
      const jewelryIdResult = result.jewelryId.toString();
      const owner = result.owner.toString();
      const price = result.price.toString();
      //manufaturer属性
      const manufacturerCompanyId = result.manufacturer.companyId.toString();
      const manufacturerCompanyType = result.manufacturer.companyType.toString();
      const manufacturerAddr = result.manufacturer.addr.toString();
      const manufacturerCompanyName = result.manufacturer.companyName.toString();
      // diamond属性
      const uniqueId = result.diamond.uniqueId.toString();
      const clarity = result.diamond.clarity.toString();
      const grade = result.diamond.grade.toString();

      const gradingLabCompanyId = result.diamond.gradingLab.companyId.toString();
      const gradingLabCompanyType = result.diamond.gradingLab.companyType.toString();
      const gradingLabAddr = result.diamond.gradingLab.addr.toString();
      const gradingLabCompanyName = result.diamond.gradingLab.companyName.toString();

      // rawDiamond属性
      const rawId = result.diamond.rawDiamond.rawId.toString();
      const rawDiamondColor = result.diamond.rawDiamond.rawDiamondColor.toString();
      const cuttingGrade = result.diamond.rawDiamond.cuttingGrade.toString();

      const cuttingCompanyId = result.diamond.rawDiamond.cuttingCompany.companyId.toString();
      const cuttingCompanyType = result.diamond.rawDiamond.cuttingCompany.companyType.toString();
      const cuttingCompanyAddr = result.diamond.rawDiamond.cuttingCompany.addr.toString();
      const cuttingCompanyName = result.diamond.rawDiamond.cuttingCompany.companyName.toString();

      const miningCompanyId = result.diamond.rawDiamond.miningCompany.companyId.toString();
      const miningCompanyType = result.diamond.rawDiamond.miningCompany.companyType.toString();
      const mininCompanyAddr = result.diamond.rawDiamond.miningCompany.addr.toString();
      const miningCompanyName = result.diamond.rawDiamond.miningCompany.companyName.toString();


      let miningCompany = {
        companyId: miningCompanyId,
        companyType: miningCompanyType,
        addr: mininCompanyAddr,
        companyName: miningCompanyName
      }

      let cuttingCompany = {
        companyId: cuttingCompanyId,
        companyType: cuttingCompanyType,
        addr: cuttingCompanyAddr,
        companyName: cuttingCompanyName
      }

      let gradingLab = {
        companyId: gradingLabCompanyId,
        companyType: gradingLabCompanyType,
        addr: gradingLabAddr,
        companyName: gradingLabCompanyName
      }
      let manufacturer = {
        companyId: manufacturerCompanyId,
        companyType: manufacturerCompanyType,
        addr: manufacturerAddr,
        companyName: manufacturerCompanyName
      }

      let rawDiamond = {
        rawId,
        rawDiamondColor,
        cuttingGrade,
        miningCompany,
        cuttingCompany
      }
      let diamond = {
        uniqueId,
        clarity,
        grade,
        gradingLab,
        rawDiamond
      }

      let jewelry = {
        jewelryId: jewelryIdResult,
        manufacturer,
        diamond,
        owner,
        price
      }
      // console.log(JSON.stringify(jewelry));

      setJewelryInfo(jewelry);
    } catch (error) {
      console.error('Verification failed', error);
      message.error('Verification failed. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: 'CustomFont, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'center', color:'#3894DB' }}>
          Verify
        </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Input
          style={{ width: '300px', marginRight: '16px' }}
          placeholder="Enter Jewelry ID"
          value={jewelryId}
          onChange={(e) => setJewelryId(e.target.value)}
        />
        <Button 
        style={{color:'#3894DB'}}
        onClick={handleVerify}>
          Verify
        </Button>
      </div>

      <Modal
        title="Jewelry Information"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        closable={false}
        okText="Close"
        width={600}
        style={{ height: 600, overflow: 'auto' }} 
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <JsonToTable json={jewelryInfo} />
      </Modal>
    </div>
  );
};

export default JewelryVerification;