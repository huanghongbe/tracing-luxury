import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import Web3 from 'web3';
import JewelryShopABI from '../abis/JewelryShop.json';
import '../global.css'

const JewelryVerification = () => {
  const [jewelryId, setJewelryId] = useState('');
  const [jewelryInfo, setJewelryInfo] = useState(null);
  const [contract, setContract] = useState(null);
  
  //firework
  const [showFireworks, setShowFireworks] = useState(false);
  
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

      const result = await contract.methods.jewelryVerify(jewelryId).call();
      setJewelryInfo(result);
      launchFireworks();
    } catch (error) {
      console.error('Verification failed', error);
      message.error('Verification failed. Please try again.');
    }
  };

  //firework
  const launchFireworks = () => {
    setShowFireworks(true);
    setTimeout(() => {
      setShowFireworks(false);
    }, 3000); // 礼花动画持续时间，单位为毫秒
  };

  return (
    <div style={{ fontFamily: 'CustomFont, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center'}}>
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
        <Button onClick={handleVerify}>
          Verify
        </Button>
      </div>
      {jewelryInfo && showFireworks && (
  <div style={{ marginTop: '16px', position: 'relative' }}>
    <h3>Jewelry Information:</h3>
    <p>Jewelry ID: {jewelryId}</p>
    <p>Manufacturer: {jewelryInfo.manufacturer}</p>
    <p>Owner: {jewelryInfo.owner}</p>
    {[...Array(10)].map((_, index) => (
      <div key={index} className="firework" style={{ left: `${Math.random() * 100}%` }}></div>
    ))}
  </div>
      )}
      </div>
);
};

export default JewelryVerification;