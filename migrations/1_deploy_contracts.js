const JewelryShop = artifacts.require("JewelryShop");
const CompanyRegistry = artifacts.require("CompanyRegistry")
const DiamondRegistry = artifacts.require("DiamondRegistry")
const RawDiamondRegistry = artifacts.require("RawDiamondRegistry")

module.exports = function (deployer) {
    deployer.deploy(CompanyRegistry)
        .then(() => CompanyRegistry.deployed())
        .then(() => deployer.deploy(RawDiamondRegistry, CompanyRegistry.address))
        .then(() => RawDiamondRegistry.deployed())
        .then(() => deployer.deploy(DiamondRegistry, RawDiamondRegistry.address, CompanyRegistry.address))
        .then(() => DiamondRegistry.deployed())
        .then(() => deployer.deploy(JewelryShop, CompanyRegistry.address, RawDiamondRegistry.address))

};
