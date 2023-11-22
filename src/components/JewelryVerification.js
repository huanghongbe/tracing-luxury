// import React, { useState, useEffect } from 'react';
// import { Input, Button, message } from 'antd';
// import Web3 from 'web3';
// import JewelryShopABI from '../abis/JewelryShop.json';
// import '../global.css'

// const JewelryVerification = () => {
//   const [jewelryId, setJewelryId] = useState('');
//   const [jewelryInfo, setJewelryInfo] = useState(null);
//   const [contract, setContract] = useState(null);
  
//   useEffect(() => {
//     initializeContract();
//   }, []);

//   const initializeContract = async () => {
//     try {
//       // Check if Web3 provider is available
//       if (window.ethereum) {
//         const web3 = new Web3(window.ethereum);
//         await window.ethereum.enable();

//         // Get the deployed contract address from the ABI
//         const networkId = await web3.eth.net.getId();
//         const deployedNetwork = JewelryShopABI.networks[networkId];
//         if (!deployedNetwork) {
//           throw new Error('Contract not deployed on the current network');
//         }
//         const contractAddress = deployedNetwork.address;

//         // Create contract instance
//         const contract = new web3.eth.Contract(JewelryShopABI.abi, contractAddress);
//         setContract(contract);
//       } else {
//         throw new Error('Web3 provider not detected');
//       }
//     } catch (error) {
//       console.error('Failed to initialize contract', error);
//       message.error('Failed to initialize contract. Please try again.');
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       if (!contract) {
//         throw new Error('Contract not initialized');
//       }

//       const result = await contract.methods.jewelryVerify(jewelryId).call();
//       setJewelryInfo(result);
//     } catch (error) {
//       console.error('Verification failed', error);
//       message.error('Verification failed. Please try again.');
//     }
//   };

//   return (
//     <div style={{ fontFamily: 'CustomFont, sans-serif' }}>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <h1 style={{ textAlign: 'center'}}>
//         Verify
//         </h1>
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <Input
//           style={{ width: '300px', marginRight: '16px' }}
//           placeholder="Enter Jewelry ID"
//           value={jewelryId}
//           onChange={(e) => setJewelryId(e.target.value)}
//         />
//         <Button onClick={handleVerify}>
//           Verify
//         </Button>
//       </div>
//       {jewelryInfo && (
//   <div style={{ marginTop: '16px', position: 'relative' }}>
//     <h3>Jewelry Information:</h3>
//     <p>Jewelry ID: {jewelryId}</p>
//     <p>Manufacturer: {jewelryInfo.manufacturer}</p>
//     <p>Owner: {jewelryInfo.owner}</p>
//   </div>
//       )}
//       </div>
// );
// };

// export default JewelryVerification;
import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import Web3 from 'web3';
import JewelryShopABI from '../abis/JewelryShop.json';
import '../global.css';

const JewelryVerification = () => {
  const [jewelryId, setJewelryId] = useState('');
  const [jewelryInfo, setJewelryInfo] = useState(null);
  const [contract, setContract] = useState(null);

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
    } catch (error) {
      console.error('Verification failed', error);
      message.error('Verification failed. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: 'CustomFont, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>
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
      {jewelryInfo && (
        <div style={{marginTop:"-50px"}}>
          <h3>Jewelry Information:</h3>
          <p>Jewelry ID: {jewelryId}</p>
<br></br>
<p>Manufacturer ID: {jewelryInfo.manufacturer.companyId.toString()}</p>
<p>Manufacturer Type: {jewelryInfo.manufacturer.companyType.toString()}</p>
<p>Manufacturer Address: {jewelryInfo.manufacturer.addr.toString()}</p>
<p>Manufacturer Name: {jewelryInfo.manufacturer.companyName.toString()}</p>
<br></br>
<p>Owner: {jewelryInfo.owner.toString()}</p>
<p>Diamond ID: {jewelryInfo.diamond.uniqueId.toString()}</p>
<p>Diamond Clarity: {jewelryInfo.diamond.clarity.toString()}</p>
<p>Diamond Grade: {jewelryInfo.diamond.grade.toString()}</p>
<br></br>
<p>Raw Diamond ID: {jewelryInfo.diamond.rawDiamond.rawId.toString()}</p>
<p>Raw Diamond Name: {jewelryInfo.diamond.rawDiamond.rawDiamondName.toString()}</p>
<p>Raw Diamond Color: {jewelryInfo.diamond.rawDiamond.rawDiamondColor.toString()}</p>
<p>Raw Diamond Cutting Grade: {jewelryInfo.diamond.rawDiamond.cuttingGrade.toString()}</p>
<p>Mining Company ID: {jewelryInfo.diamond.rawDiamond.miningCompany.companyId.toString()}</p>
<p>Cutting Company ID: {jewelryInfo.diamond.rawDiamond.cuttingCompany.companyId.toString()}</p>
<br></br>
<p>Price: {jewelryInfo.price.toString()}</p>
        </div>
      )}
    </div>
  );
};

export default JewelryVerification;