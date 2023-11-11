import React, { useState, useEffect } from 'react';

const CompanyRegistry = () => {
  const [selectedType, setSelectedType] = useState('');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // 模拟通过 Web3.js 调用智能合约接口获取公司数据
    const fetchCompanies = async () => {
      // 假设这里使用了一个名为 getCompanies 的智能合约方法
      // 调用合约方法获取公司数据
      const fetchedCompanies = await getCompanies();
      setCompanies(fetchedCompanies);
    };

    fetchCompanies();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const getCompanies = () => {
    // 模拟从智能合约获取的公司数据


    return [
      { name: 'Company A', type: 'Mining' },
      { name: 'Company B', type: 'Cutting' },
      { name: 'Company C', type: 'Grading' },
      { name: 'Company D', type: 'Manufacturer' }
    ];
  };

  return (
    <div>
      <h2>Company Registry</h2>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Select a type</option>
        <option value="Mining">Mining</option>
        <option value="Cutting">Cutting</option>
        <option value="Grading">Grading</option>
        <option value="Manufacturer">Manufacturer</option>
      </select>
      {selectedType && <div>Selected Type: {selectedType}</div>}

      <h3>Companies</h3>
      {companies.map((company, index) => (
        <div key={index} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
          <div>Name: {company.name}</div>
          <div>Type: {company.type}</div>
        </div>
      ))}
    </div>
  );
};

export default CompanyRegistry;