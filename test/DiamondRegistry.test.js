// 导入所需模块
const DiamondRegistry = artifacts.require('DiamondRegistry');
const RawDiamondRegistry = artifacts.require('RawDiamondRegistry');
const CompanyRegistry = artifacts.require('CompanyRegistry');

contract('DiamondRegistry', (accounts) => {
    let diamondRegistry;
    let rawDiamondRegistry;
    let companyRegistry;

    beforeEach(async () => {
        // 部署 CompanyRegistry 合约
        companyRegistry = await CompanyRegistry.new();

        // 部署 RawDiamondRegistry 合约，并传入 CompanyRegistry 地址
        rawDiamondRegistry = await RawDiamondRegistry.new(companyRegistry.address);

        // 部署 DiamondRegistry 合约，并传入 RawDiamondRegistry 地址
        diamondRegistry = await DiamondRegistry.new(rawDiamondRegistry.address, companyRegistry.address);
    });

    it('should grade a raw diamond and register a diamond', async () => {
        // 注册挖掘公司 miningCompany
        // 注册切割公司 cuttingCompany
        // 注册评级公司 gradingCompany
        const miningCompany = accounts[0];
        const cuttingCompany = accounts[1];
        const gradingCompany = accounts[2];

        await companyRegistry.companyRegister(0, { from: miningCompany });
        await companyRegistry.companyRegister(1, { from: cuttingCompany });
        await companyRegistry.companyRegister(2, { from: gradingCompany });

        await rawDiamondRegistry.rawDiamondRegister({ from: miningCompany });
        let rawDiamond = await rawDiamondRegistry.getRawDiamond(0);

        await rawDiamondRegistry.rawDiamondCutting(rawDiamond.rawId, { from: cuttingCompany });

        rawDiamond = await rawDiamondRegistry.getRawDiamond(rawDiamond.rawId);
        //console.log(rawDiamond)


        await diamondRegistry.diamondRegister(rawDiamond.rawId, { from: gradingCompany });
        const diamond = await diamondRegistry.getDiamond(0);
        console.log(diamond);

    });

});