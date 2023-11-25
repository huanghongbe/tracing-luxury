const CompanyRegistry = artifacts.require("CompanyRegistry");
const RawDiamondRegistry = artifacts.require("RawDiamondRegistry");
const DiamondRegistry = artifacts.require("DiamondRegistry");
const JewelryShop = artifacts.require("JewelryShop");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(CompanyRegistry);
  // 等待第一个合约部署完成后再继续
  await deployer.deploy(RawDiamondRegistry, CompanyRegistry.address);
  // 等待第二个合约部署完成后再继续
  await deployer.deploy(DiamondRegistry, RawDiamondRegistry.address, CompanyRegistry.address);
  // 等待第三个合约部署完成后再继续
  await deployer.deploy(JewelryShop, CompanyRegistry.address, DiamondRegistry.address);
};
