// import React from 'react'
// import ReactDOM from 'react-dom'
// import './global.css'
// import App from './components/App'
// import Login from './components/Login'
// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <Login />
// //   </React.StrictMode>
// // );
// import { createRoot } from 'react-dom/client'
// function Overlay() {
//   return (
//     <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
//       <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate3d(-50%,-50%,0)' }}>
//         <h1 style={{ margin: 0, padding: 0, fontSize: '15em', fontWeight: 350, letterSpacing: '-0.05em' }}>Jewelry Shop</h1>
//       </div>
//       <div style={{ position: 'absolute', bottom: 200, right: 300, fontSize: '26px', fontWeight: 500 }}>Enter</div>
//     </div>
//   )
// }

// createRoot(document.getElementById('root')).render(
// <>
// <Login /> 
// <Overlay />
// </>
// )
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom';
import './global.css';
import App from './components/App';
import Login from './components/Login';


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
  const handleEnterClick = () => {
    createRoot(document.getElementById('root')).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
    );
  };

  return (
    <React.StrictMode>
      <Login />
      <Overlay onEnterClick={handleEnterClick} />
    </React.StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
