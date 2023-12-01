import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom';
import './global.css';
import App from './components/App';
import App1 from './components/App1';
import Login from './components/Login';
import { Modal, Button, Divider } from 'antd';


function Overlay({ onEnterClick }) {
  const [jewelryText, setJewelryText] = useState('');
  const [shopText, setShopText] = useState('');
  const [enterText, setEnterText] = useState('');
  const [indexJ, setIndexJ] = useState(0); // Jewelry 的索引
  const [indexS, setIndexS] = useState(0); // Shop 的索引
  const [indexE, setIndexE] = useState(0); // Enter 的索引
  const jewelryFull = 'Jewelry';
  const shopFull = 'Shop';
  const enterFull = 'Enter';

  useEffect(() => {
    if (indexJ < jewelryFull.length) {
      const timerJ = setTimeout(() => {
        setJewelryText((prev) => prev + jewelryFull[indexJ]);
        setIndexJ((prev) => prev + 1);
      }, 200);

      return () => clearTimeout(timerJ);
    } else if (indexS < shopFull.length) {
      const timerS = setTimeout(() => {
        setShopText((prev) => prev + shopFull[indexS]);
        setIndexS((prev) => prev + 1);
      }, 200);

      return () => clearTimeout(timerS);
    } else if (indexE < enterFull.length) {
      const timerE = setTimeout(() => {
        setEnterText((prev) => prev + enterFull[indexE]);
        setIndexE((prev) => prev + 1);
      }, 200);

      return () => clearTimeout(timerE);
    }
  }, [indexJ, jewelryFull, indexS, shopFull, indexE, enterFull]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)' }}>
        <h1 style={{ margin: 0, padding: 0, fontSize: '12em', fontWeight: 350, letterSpacing: '-0.05em' }}>
          {jewelryText}
        </h1>
      </div>
      <div style={{ position: 'absolute', top: '45%', left: '43%', transform: 'translateX(-50%)' }}>
        <h1 style={{ margin: 0, padding: 0, fontSize: '12em', fontWeight: 350, letterSpacing: '-0.05em' }}>
          {shopText}
        </h1>
      </div>
      <div style={{ position: 'absolute', bottom: 200, right: 320, fontSize: '26px', fontWeight: 500, cursor: 'pointer', pointerEvents: 'auto' }} onClick={onEnterClick}>
        {enterText}
      </div>
    </div>
  );
}

function Main() {
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState(null);

  const handleModalClose = (type) => {
    setUserType(type);
    setShowModal(false);
  };
  // const handleEnterClick = () => {
  //   createRoot(document.getElementById('root')).render(
  //       <React.StrictMode>
  //         <App />
  //       </React.StrictMode>
  //   );
  // };
  const handleEnterClick = () => {
    setShowModal(true); // 点击 "Enter" 后显示 Modal
  };
  useEffect(() => {
    if (userType === 'company') {
      createRoot(document.getElementById('root')).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } else if (userType === 'customer') {
      createRoot(document.getElementById('root')).render(
        <React.StrictMode>
          <App1 />
        </React.StrictMode>
      );
    }
  }, [userType]);

  // return (
  //   <React.StrictMode>
  //     <Login />
  //     <Overlay onEnterClick={handleEnterClick} />,
  //   </React.StrictMode>
  // );
  return (
    <React.StrictMode>
      <Login />
      <Overlay onEnterClick={handleEnterClick} />
      <Modal
        title="Choose your identity"
        visible={showModal}
        footer={null}
        closable={false}
        maskClosable={false}
        wrapClassName="custom-modal"
      >
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <span style={{ fontWeight: '700', fontSize: '18px' }}>I'M</span>
        </div>
        <Button className="enter-button" type="default" size="large" onClick={() => handleModalClose('company')}>
          Company
        </Button>
        <Divider type="vertical" style={{ margin: '0 12px' }} />
        <Button className="enter-button" type="default" size="large" onClick={() => handleModalClose('customer')}>
          Customer
        </Button>
      </Modal>
    </React.StrictMode >
  );
}

createRoot(document.getElementById('root')).render(<Main />);
