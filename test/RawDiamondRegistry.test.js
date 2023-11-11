// 导入必要的模块和合约
const RawDiamondRegistry = artifacts.require('RawDiamondRegistry');
const CompanyRegistry = artifacts.require('CompanyRegistry');

contract('RawDiamondRegistry', (accounts) => {
  let companyRegistry;
  let rawDiamondRegistry;
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  // 在每个测试用例之前部署CompanyRegistry和RawDiamondRegistry合约
  beforeEach(async () => {
    companyRegistry = await CompanyRegistry.new();
    rawDiamondRegistry = await RawDiamondRegistry.new(companyRegistry.address);
  });

  // 测试创建RawDiamond
  it('should register a raw diamond', async () => {
    // 创建Mining类型的Company
    await companyRegistry.companyRegister(0, { from: accounts[0] });

    await companyRegistry.companyRegister(1, { from: accounts[1] });

    // 注册RawDiamond
    await rawDiamondRegistry.rawDiamondRegister({ from: accounts[0] });

    // 获取RawDiamond
    let rawDiamond = await rawDiamondRegistry.getRawDiamond(0);

    await rawDiamondRegistry.rawDiamondCutting(rawDiamond.rawId, { from: accounts[1] });


    rawDiamond = await rawDiamondRegistry.getRawDiamond(0);

    //console.log(rawDiamond);
    // 验证结果
    assert.equal(rawDiamond.rawId, 0, 'Invalid rawId');
    assert.equal(rawDiamond.miningCompany, accounts[0], 'Invalid miningCompany');
    assert.equal(rawDiamond.cuttingCompany, accounts[1], 'Invalid cuttingCompany');

  });

  // 其他测试用例...
});