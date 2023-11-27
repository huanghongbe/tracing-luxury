// ChainSwitcher.js
import React from 'react';
import { Select } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const { Option } = Select;

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

const ChainSwitcher = () => {
    const { activate, chainId } = useWeb3React();

    const handleChange = (value) => {
        activate(injected, undefined, true); // 切换链
    };

    return (
        <Select defaultValue={chainId} onChange={handleChange}>
            <Option value={1}>Mainnet</Option>
            <Option value={3}>Ropsten</Option>
            <Option value={4}>Rinkeby</Option>
            <Option value={5}>Göerli</Option>
            <Option value={42}>Kovan</Option>
        </Select>
    );
};

export default ChainSwitcher;
