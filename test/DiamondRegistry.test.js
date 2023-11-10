// 导入所需模块
const DiamondRegistry = artifacts.require('DiamondRegistry');
const RawDiamondRegistry = artifacts.require('RawDiamondRegistry');
const CompanyRegistry = artifacts.require('CompanyRegistry');

contract('DiamondRegistry', (accounts) => {
    let diamondRegistry;
    let rawDiamondRegistry;
    let companyRegistry;

    before(async () => {
        // 部署 CompanyRegistry 合约
        companyRegistry = await CompanyRegistry.new();

        // 部署 RawDiamondRegistry 合约，并传入 CompanyRegistry 地址
        rawDiamondRegistry = await RawDiamondRegistry.new(companyRegistry.address);

        // 部署 DiamondRegistry 合约，并传入 RawDiamondRegistry 地址
        diamondRegistry = await DiamondRegistry.new(rawDiamondRegistry.address);
    });

    it('should grade a raw diamond and register a diamond', async () => {
        const gradingCompany = accounts[2];

        // 注册评级公司
        await companyRegistry.companyRegister(
            2, // CompanyType.Grading
            { from: gradingCompany }
        );

        const miningCompany = accounts[0];
        await companyRegistry.companyRegister(
            0,
            { from: miningCompany }
        )

        // 注册挖掘公司 miningCompany
        // 注册切割公司 cuttingCompany
        // 注册评级公司 gradingCompany
        // rawDiamondRegistry.rawDiamondRegister(挖掘公司)
        // rawDiamondRegistry.rawDiamondCutting(切割公司)
        // const rowId = rawDiamondRegistry.diamondGrading(评级公司)
        // 钻石注册 diamondRegistry.diamondRegister(rowId)
        // getDiamond 要获取到对应信息，包含rawDiamond信息

    });

    // 添加更多的测试用例...

});