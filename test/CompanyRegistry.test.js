// 导入必要的模块和合约
const CompanyRegistry = artifacts.require('CompanyRegistry');

contract('CompanyRegistry', (accounts) => {
  let companyRegistry;

  // 在每个测试用例之前部署CompanyRegistry合约
  beforeEach(async () => {
    companyRegistry = await CompanyRegistry.new();
  });

  // 测试创建Mining类型的Company
  it('should create a Mining company', async () => {
    await companyRegistry.companyRegister(0, { from: accounts[0] });
    const companyType = await companyRegistry.getCompanyType(accounts[0]);
    assert.equal(companyType, 0, 'Invalid company type');
  });

  // 测试创建Cutting类型的Company
  it('should create a Cutting company', async () => {
    await companyRegistry.companyRegister(1, { from: accounts[1] });
    const companyType = await companyRegistry.getCompanyType(accounts[1]);
    assert.equal(companyType, 1, 'Invalid company type');
  });

  // 测试创建Grading类型的Company
  it('should create a Grading company', async () => {
    await companyRegistry.companyRegister(2, { from: accounts[2] });
    const companyType = await companyRegistry.getCompanyType(accounts[2]);
    assert.equal(companyType, 2, 'Invalid company type');
  });

  // 测试创建Manufacturer类型的Company
  it('should create a Manufacturer company', async () => {
    await companyRegistry.companyRegister(3, { from: accounts[3] });
    const companyType = await companyRegistry.getCompanyType(accounts[3]);
    assert.equal(companyType, 3, 'Invalid company type');
  });

});