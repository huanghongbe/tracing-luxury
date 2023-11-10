import React, { useState } from 'react';
import styles from './App.module.css';
import Connect from './connect'


const Jewelry = () => {
  const [rotated1, setRotated1] = useState(false);
  const [showMore1, setShowMore1] = useState(false);
  const [readMore1, setReadMore1] = useState(false);

  const [rotated2, setRotated2] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [readMore2, setReadMore2] = useState(false);

  const [rotated3, setRotated3] = useState(false);
  const [showMore3, setShowMore3] = useState(false);
  const [readMore3, setReadMore3] = useState(false);

  const [rotated4, setRotated4] = useState(false);
  const [showMore4, setShowMore4] = useState(false);
  const [readMore4, setReadMore4] = useState(false);

  const [rotated5, setRotated5] = useState(false);
  const [showMore5, setShowMore5] = useState(false);
  const [readMore5, setReadMore5] = useState(false);

  const [rotated6, setRotated6] = useState(false);
  const [showMore6, setShowMore6] = useState(false);
  const [readMore6, setReadMore6] = useState(false);

  const [rotated7, setRotated7] = useState(false);
  const [showMore7, setShowMore7] = useState(false);
  const [readMore7, setReadMore7] = useState(false);

  const [rotated8, setRotated8] = useState(false);
  const [showMore8, setShowMore8] = useState(false);
  const [readMore8, setReadMore8] = useState(false);

  const [rotated9, setRotated9] = useState(false);
  const [showMore9, setShowMore9] = useState(false);
  const [readMore9, setReadMore9] = useState(false);


  function handleClick1() {
    if (showMore1) {
      setRotated1(false);
      setShowMore1(false);
      setReadMore1(false); 
    } else {
      setRotated1(true);
      setShowMore1(true);
      setReadMore1(true); 
    }
  }

  function handleClick2() {
    if (showMore2) {
      setRotated2(false);
      setShowMore2(false);
      setReadMore2(false); 
    } else {
      setRotated2(true);
      setShowMore2(true);
      setReadMore2(true); 
    }
  }

  function handleClick3() {
    if (showMore3) {
      setRotated3(false);
      setShowMore3(false);
      setReadMore3(false); 
    } else {
      setRotated3(true);
      setShowMore3(true);
      setReadMore3(true); 
    }
  }

  function handleClick4() {
    if (showMore4) {
      setRotated4(false);
      setShowMore4(false);
      setReadMore4(false); 
    } else {
      setRotated4(true);
      setShowMore4(true);
      setReadMore4(true); 
    }
  }

  function handleClick5() {
    if (showMore5) {
      setRotated5(false);
      setShowMore5(false);
      setReadMore5(false); 
    } else {
      setRotated5(true);
      setShowMore5(true);
      setReadMore5(true); 
    }
  }

  function handleClick6() {
    if (showMore6) {
      setRotated6(false);
      setShowMore6(false);
      setReadMore6(false); 
    } else {
      setRotated6(true);
      setShowMore6(true);
      setReadMore6(true); 
    }
  }

  function handleClick7() {
    if (showMore7) {
      setRotated7(false);
      setShowMore7(false);
      setReadMore7(false); 
    } else {
      setRotated7(true);
      setShowMore7(true);
      setReadMore7(true); 
    }
  }

  function handleClick8() {
    if (showMore8) {
      setRotated8(false);
      setShowMore8(false);
      setReadMore8(false); 
    } else {
      setRotated8(true);
      setShowMore8(true);
      setReadMore8(true); 
    }
  }

  function handleClick9() {
    if (showMore9) {
      setRotated9(false);
      setShowMore9(false);
      setReadMore9(false); 
    } else {
      setRotated9(true);
      setShowMore9(true);
      setReadMore9(true); 
    }
  }

  const rotation1 = rotated1 ? 90 : 0;
  const rotation2 = rotated2 ? 90 : 0;
  const rotation3 = rotated3 ? 90 : 0;
  const rotation4 = rotated4 ? 90 : 0;
  const rotation5 = rotated5 ? 90 : 0;
  const rotation6 = rotated6 ? 90 : 0;
  const rotation7 = rotated7 ? 90 : 0;
  const rotation8 = rotated8 ? 90 : 0;
  const rotation9 = rotated9 ? 90 : 0;

  return (
      <div className={styles['all']}>
        <Connect />
        <div className={styles['container']}>
          <div>
            <div className={styles['magic']}>
              <div className={styles['magic22']}>
              <div className={styles['magic3']} onClick={handleClick1}>
        <div className={styles['logo']}>  
        <span className={styles['spanstyle1']}>  
        <span className={styles['spanstyle2']}>  
            <img className={styles.imgstyle1} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%2760%27/%3e" />
          </span>
          <img className={styles.imgstyle2} alt="Akuna Capital" src="https://pyth.network/_next/image?url=%2Fimages%2Fpublishers%2Fakuna.svg&w=640&q=75" decoding="async" data-nimg="intrinsic" />        </span>
      </div>
      <div className={styles['titlestyle']} style={{marginBottom:"-14px"}}>  
        <h4 className={styles['hstyle']}>Akuna Capital</h4>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" role="img" className={styles.svgstyle} style={{ transform: `rotate(${rotation1}deg)` }}>
          <path d="M0 5.172h7.877L5.475 8.059 6.257 9.000 10 4.500 6.257 0l-.782.940 2.402 2.888H0v1.344Z" fill="currentColor"></path>
        </svg>
      </div>
      <p className={showMore1 ? styles['textstyle-show'] : styles['textstyle']}>  
      {readMore1 ? "Akuna Capital is a leading options market maker specializing in derivatives market making and sophisticated modelling. They trade options on a wide range of underlyings including Indices, Commodities, Currencies and Treasuries over a wide list of US &amp; Asian venues including CME, ICE, CFE, CBOE, C2, BATS, EDGX, ISE, Gemini, MIAX Pearl, HKEX, KRX and NOM." : "Akuna Capital is a leading options market maker specializing in derivatives market making and sophisticated modelling. They trade options on a wide range of underlyings including Indices, Commodities, Currencies and Treasuries over a wide list of US &amp; Asian venues including CME, ICE, CFE, CBOE, C2, BATS, EDGX, ISE, Gemini, MIAX Pearl, HKEX, KRX and NOM."}
        </p>
      
      {showMore1 && (
        <div>
      <div className={styles['textstyle']}>
      <p >AlphaLab Capital will contribute its real-time market data for crypto assets.</p>
      </div>
      <a
      className={styles['btn']}
      target="_blank"
      rel="noreferrer"
      href="https://www.alphalab.capital/"
    >
      <span className={styles['spanstyle3']}>
        see more
      </span>
    </a>
    </div>
      )}
      </div>
      <div className={styles['magic3']} onClick={handleClick2}>
        <div className={styles['logo']}>  
        <span className={styles['spanstyle1']}>  
        <span className={styles['spanstyle2']}>  
            <img className={styles.imgstyle1} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%2760%27/%3e" />
          </span>
          <img className={styles.imgstyle2} alt="Binance" src="https://pyth.network/_next/image?url=%2Fimages%2Fpublishers%2Fbinance.svg&w=640&q=75" decoding="async" data-nimg="intrinsic" />        </span>
      </div>
      <div className={styles['titlestyle']} style={{marginBottom:"-14px"}}>  
        <h4 className={styles['hstyle']}>Binance</h4>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" role="img" className={styles.svgstyle} style={{ transform: `rotate(${rotation2}deg)` }}>
          <path d="M0 5.172h7.877L5.475 8.059 6.257 9.000 10 4.500 6.257 0l-.782.940 2.402 2.888H0v1.344Z" fill="currentColor"></path>
        </svg>
      </div>
      <p className={showMore2 ? styles['textstyle-show'] : styles['textstyle']}>  
      {readMore2 ? "Binance Oracle is an official data service provided by Binance to provide reliable, secure, and timely on-chain data feeds to the projects on the BNB chain." : "Binance Oracle is an official data service provided by Binance to provide reliable, secure, and timely on-chain data feeds to the projects on the BNB chain."}
        </p>
      
      {showMore2 && (
        <div>
      <div className={styles['textstyle']}>
      <p >The Binance Oracle will contribute price data directly from its platform to the Pyth network.</p>
      </div>
      <a
      className={styles['btn']}
      target="_blank"
      rel="noreferrer"
      href="https://binance.com/"
    >
      <span className={styles['spanstyle3']}>
        see more
      </span>
    </a>
    </div>
      )}
      </div>
      <div className={styles['magic3']} onClick={handleClick3}>
        <div className={styles['logo']}>  
        <span className={styles['spanstyle1']}>  
        <span className={styles['spanstyle2']}>  
            <img className={styles.imgstyle1} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%2760%27/%3e" />
          </span>
          <img className={styles.imgstyle2} alt="Gate.io" src="https://pyth.network/_next/image?url=%2Fimages%2Fpublishers%2Fgate.svg&w=640&q=75" decoding="async" data-nimg="intrinsic" />        </span>
      </div>
      <div className={styles['titlestyle']} style={{marginBottom:"-14px"}}>  
        <h4 className={styles['hstyle']}>Gate.io</h4>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" role="img" className={styles.svgstyle} style={{ transform: `rotate(${rotation3}deg)` }}>
          <path d="M0 5.172h7.877L5.475 8.059 6.257 9.000 10 4.500 6.257 0l-.782.940 2.402 2.888H0v1.344Z" fill="currentColor"></path>
        </svg>
      </div>
      <p className={showMore3 ? styles['textstyle-show'] : styles['textstyle']}>  
      {readMore3 ? "Founded in 2013, the platform is one of the oldest cryptocurrency exchange in the world and serves today over 6 million users, offering over 1,700 trading pairs with 1,000 different cryptocurrencies listed on the main exchange. Since September 2021, daily spot volumes traded on Gate.io have continuously surpassed $1B, with a peak at $2.8B." : "Founded in 2013, the platform is one of the oldest cryptocurrency exchange in the world and serves today over 6 million users, offering over 1,700 trading pairs with 1,000 different cryptocurrencies listed on the main exchange. Since September 2021, daily spot volumes traded on Gate.io have continuously surpassed $1B, with a peak at $2.8B."}
        </p>
      
      {showMore3 && (
        <div>
      <div className={styles['textstyle']}>
      <p >Through the partnership, Gate.io will provide real-time cryptocurrency data to the Pyth network.</p>
      </div>
      <a
      className={styles['btn']}
      target="_blank"
      rel="noreferrer"
      href="https://www.gate.io/"
    >
      <span className={styles['spanstyle3']}>
        see more
      </span>
    </a>
    </div>
      )}
      </div>
      </div>
    <div className={styles['magic22']}>         
    <div className={styles['magic3']} onClick={handleClick4}>
        <div className={styles['logo']}>  
        <span className={styles['spanstyle1']}>  
        <span className={styles['spanstyle2']}>  
            <img className={styles.imgstyle1} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%2760%27/%3e" />
          </span>
          <img className={styles.imgstyle2} alt="OKX" src="https://pyth.network/_next/image?url=%2Fimages%2Fpublishers%2Fokx.svg&w=640&q=75" decoding="async" data-nimg="intrinsic" />        </span>
      </div>
      <div className={styles['titlestyle']} style={{marginBottom:"-14px"}}>  
        <h4 className={styles['hstyle']}>OKX</h4>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" role="img" className={styles.svgstyle} style={{ transform: `rotate(${rotation4}deg)` }}>
          <path d="M0 5.172h7.877L5.475 8.059 6.257 9.000 10 4.500 6.257 0l-.782.940 2.402 2.888H0v1.344Z" fill="currentColor"></path>
        </svg>
      </div>
      <p className={showMore4 ? styles['textstyle-show'] : styles['textstyle']}>  
      {readMore4 ? "OKX is the second biggest global crypto exchange by trading volume. Trusted by more than 20 million global customers, OKX is known for being the fastest and most reliable crypto trading app for investors and professional traders everywhere." : "OKX is the second biggest global crypto exchange by trading volume. Trusted by more than 20 million global customers, OKX is known for being the fastest and most reliable crypto trading app for investors and professional traders everywhere."}
        </p>
      
      {showMore4 && (
        <div>
      <div className={styles['textstyle']}>
      <p >OKX will contribute its real-time market data for crypto assets.</p>
      </div>
      <a
      className={styles['btn']}
      target="_blank"
      rel="noreferrer"
      href="https://www.okx.com/"
    >
      <span className={styles['spanstyle3']}>
        see more
      </span>
    </a>
    </div>
      )}
      </div>
      <div className={styles['magic3']} onClick={handleClick5}>
        <div className={styles['logo']}>  
        <span className={styles['spanstyle1']}>  
        <span className={styles['spanstyle2']}>  
            <img className={styles.imgstyle1} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%2760%27/%3e" />
          </span>
          <img className={styles.imgstyle2} alt="kuCoin" src="https://pyth.network/_next/image?url=%2Fimages%2Fpublishers%2Fkucoin.svg&w=640&q=75" decoding="async" data-nimg="intrinsic" />        </span>
      </div>
      <div className={styles['titlestyle']} style={{marginBottom:"-14px"}}>  
        <h4 className={styles['hstyle']}>KuCoin</h4>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" role="img" className={styles.svgstyle} style={{ transform: `rotate(${rotation5}deg)` }}>
          <path d="M0 5.172h7.877L5.475 8.059 6.257 9.000 10 4.500 6.257 0l-.782.940 2.402 2.888H0v1.344Z" fill="currentColor"></path>
        </svg>
      </div>
      <p className={showMore5 ? styles['textstyle-show'] : styles['textstyle']}>  
      {readMore5 ? "Launched in September 2017, KuCoin is a global cryptocurrency exchange that offers over 700 digital assets, and currently provides spot trading, margin trading, peer-to-peer fiat trading, futures trading, staking, and lending services to its 18 million users in 207 countries and regions." : "Launched in September 2017, KuCoin is a global cryptocurrency exchange that offers over 700 digital assets, and currently provides spot trading, margin trading, peer-to-peer fiat trading, futures trading, staking, and lending services to its 18 million users in 207 countries and regions."}
        </p>
      
      {showMore5 && (
        <div>
      <div className={styles['textstyle']}>
      <p >KuCoin will contribute its platform's real-time prices to the network.</p>
      </div>
      <a
      className={styles['btn']}
      target="_blank"
      rel="noreferrer"
      href="https://www.kucoin.com/"
    >
      <span className={styles['spanstyle3']}>
        see more
      </span>
    </a>
    </div>
      )}
      </div>
      <div className={styles['magic3']} onClick={handleClick6}>
        <div className={styles['logo']}>  
        <span className={styles['spanstyle1']}>  
        <span className={styles['spanstyle2']}>  
            <img className={styles.imgstyle1} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%2760%27/%3e" />
          </span>
          <img className={styles.imgstyle2} alt="MEXC" src="https://pyth.network/_next/image?url=%2Fimages%2Fpublishers%2Fmexc.svg&w=640&q=75" decoding="async" data-nimg="intrinsic" />        </span>
      </div>
      <div className={styles['titlestyle']} style={{marginBottom:"-14px"}}>  
        <h4 className={styles['hstyle']}>MEXC</h4>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" role="img" className={styles.svgstyle} style={{ transform: `rotate(${rotation6}deg)` }}>
          <path d="M0 5.172h7.877L5.475 8.059 6.257 9.000 10 4.500 6.257 0l-.782.940 2.402 2.888H0v1.344Z" fill="currentColor"></path>
        </svg>
      </div>
      <p className={showMore6 ? styles['textstyle-show'] : styles['textstyle']}>  
      {readMore6 ? "The exchange at MEXC Global is a high-performance trading engine that has been developed by experts from the banking industry and is capable of completing 1.4 million transactions per second, which results in groundbreaking efficiency and enhanced performance." : "The exchange at MEXC Global is a high-performance trading engine that has been developed by experts from the banking industry and is capable of completing 1.4 million transactions per second, which results in groundbreaking efficiency and enhanced performance."}
        </p>
      
      {showMore6 && (
        <div>
      <div className={styles['textstyle']}>
      <p >MEXC Global will contribute its digital assets prices and work towards establishing increasingly reliable and stable data.</p>
      </div>
      <a
      className={styles['btn']}
      target="_blank"
      rel="noreferrer"
      href="https://www.mexc.com/"
    >
      <span className={styles['spanstyle3']}>
        see more
      </span>
    </a>
    </div>
      )}
      </div>
    </div>
    <div className={styles['magic22']}>         
    <div className={styles['magic3']} onClick={handleClick7}>
        <div className={styles['logo']}>  
        <span className={styles['spanstyle1']}>  
        <span className={styles['spanstyle2']}>  
            <img className={styles.imgstyle1} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%2760%27/%3e" />
          </span>
          <img className={styles.imgstyle2} alt="Auros Global" src="https://pyth.network/_next/image?url=%2Fimages%2Fpublishers%2Fauros.svg&w=640&q=75" decoding="async" data-nimg="intrinsic" />        </span>
      </div>
      <div className={styles['titlestyle']} style={{marginBottom:"-14px"}}>  
        <h4 className={styles['hstyle']}>Auros Global</h4>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" role="img" className={styles.svgstyle} style={{ transform: `rotate(${rotation7}deg)` }}>
          <path d="M0 5.172h7.877L5.475 8.059 6.257 9.000 10 4.500 6.257 0l-.782.940 2.402 2.888H0v1.344Z" fill="currentColor"></path>
        </svg>
      </div>
      <p className={showMore7 ? styles['textstyle-show'] : styles['textstyle']}>  
      {readMore7 ? "Auros is an algorithmic trading and market-making firm that delivers best-in-class liquidity for exchanges and token projects." : "Auros is an algorithmic trading and market-making firm that delivers best-in-class liquidity for exchanges and token projects."}
        </p>
      
      {showMore7 && (
        <div>
      <div className={styles['textstyle']}>
      <p >Auros will be providing the Pyth network with data for a range of cryptocurrency symbols.</p>
      </div>
      <a
      className={styles['btn']}
      target="_blank"
      rel="noreferrer"
      href="https://www.auros.global/"
    >
      <span className={styles['spanstyle3']}>
        see more
      </span>
    </a>
    </div>
      )}
      </div>
      <div className={styles['magic3']} onClick={handleClick8}>
        <div className={styles['logo']}>  
        <span className={styles['spanstyle1']}>  
        <span className={styles['spanstyle2']}>  
            <img className={styles.imgstyle1} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%2760%27/%3e" />
          </span>
          <img className={styles.imgstyle2} alt="0x" src="https://pyth.network/_next/image?url=%2Fimages%2Fpublishers%2F0x.svg&w=640&q=75" decoding="async" data-nimg="intrinsic" />        </span>
      </div>
      <div className={styles['titlestyle']} style={{marginBottom:"-14px"}}>  
        <h4 className={styles['hstyle']}>0x</h4>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" role="img" className={styles.svgstyle} style={{ transform: `rotate(${rotation8}deg)` }}>
          <path d="M0 5.172h7.877L5.475 8.059 6.257 9.000 10 4.500 6.257 0l-.782.940 2.402 2.888H0v1.344Z" fill="currentColor"></path>
        </svg>
      </div>
      <p className={showMore8 ? styles['textstyle-show'] : styles['textstyle']}>  
      {readMore8 ? "0x Labs are the creators and core contributors to the 0x Protocol, a decentralized exchange infrastructure for the internet. Founded in 2017, the project has been used by many digital asset businesses to incorporate exchange functionality into their applications and create new markets for digital assets. Since its inception, the 0x Protocol has enabled the exchange of more than $94 billion in tokenized value across approximately 18 million crypto trades." : "0x Labs are the creators and core contributors to the 0x Protocol, a decentralized exchange infrastructure for the internet. Founded in 2017, the project has been used by many digital asset businesses to incorporate exchange functionality into their applications and create new markets for digital assets. Since its inception, the 0x Protocol has enabled the exchange of more than $94 billion in tokenized value across approximately 18 million crypto trades."}
        </p>
      
      {showMore8 && (
        <div>
      <div className={styles['textstyle']}>
      <p >0x Labs will provide real-time crypto pricing data from the 0x network to the Pyth network.</p>
      </div>
      <a
      className={styles['btn']}
      target="_blank"
      rel="noreferrer"
      href="https://0x.org/"
    >
      <span className={styles['spanstyle3']}>
        see more
      </span>
    </a>
    </div>
      )}
      </div>
      <div className={styles['magic3']} onClick={handleClick9}>
        <div className={styles['logo']}>  
        <span className={styles['spanstyle1']}>  
        <span className={styles['spanstyle2']}>  
            <img className={styles.imgstyle1} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%2760%27/%3e" />
          </span>
          <img className={styles.imgstyle2} alt="Orca" src="https://pyth.network/_next/image?url=%2Fimages%2Fpublishers%2Forca.svg&w=640&q=75" decoding="async" data-nimg="intrinsic" /></span>
      </div>
      <div className={styles['titlestyle']} style={{marginBottom:"-14px"}}>  
        <h4 className={styles['hstyle']}>Orca</h4>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" role="img" className={styles.svgstyle} style={{ transform: `rotate(${rotation9}deg)` }}>
          <path d="M0 5.172h7.877L5.475 8.059 6.257 9.000 10 4.500 6.257 0l-.782.940 2.402 2.888H0v1.344Z" fill="currentColor"></path>
        </svg>
      </div>
      <p className={showMore9 ? styles['textstyle-show'] : styles['textstyle']}>  
      {readMore9 ? "Orca is a leading Automated Market Maker (AMM) Decentralized Exchange (DEX) on Solana. Orca's mission is to create a next-generation AMM that pairs greater capital efficiency with a simple, human-centered UX." : "Orca is a leading Automated Market Maker (AMM) Decentralized Exchange (DEX) on Solana. Orca's mission is to create a next-generation AMM that pairs greater capital efficiency with a simple, human-centered UX."}
        </p>
      {showMore9 && (
        <div>
      <div className={styles['textstyle']}>
      <p >Orca will contribute its crypto market data directly to the network.</p>
      </div>
      <a
      className={styles['btn']}
      target="_blank"
      rel="noreferrer"
      href="https://www.orca.so/"
    >
      <span className={styles['spanstyle3']}>
        see more
      </span>
    </a>
    </div>
      )}
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Jewelry;