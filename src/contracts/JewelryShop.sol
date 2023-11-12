// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CompanyRegistry.sol";
import "./DiamondRegistry.sol";

contract JewelryShop {
    struct Jewelry {
        uint256 jewelryId;
        address manufacturer;
        address owner;
        DiamondRegistry.Diamond diamond;
        uint256 price;
    }

    mapping(uint256 => Jewelry) public jewelryItems;
    uint256 public jewelryCounts;

    CompanyRegistry private companyRegistry;
    DiamondRegistry private diamondRegistry;

    constructor(address _companyRegistry, address _diamondRegistry) {
        companyRegistry = CompanyRegistry(_companyRegistry);
        diamondRegistry = DiamondRegistry(_diamondRegistry);
    }

    modifier onlyManufacturer() {
        require(
            companyRegistry.getCompanyType(msg.sender) == CompanyRegistry.CompanyType.Manufacturer,
            "You are not the manufacturers!"
        );
        _;
    }
    function getAllJewels() public view returns (Jewelry[] memory) {
        Jewelry[] memory allJewels = new Jewelry[](jewelryCounts);
        for (uint i = 0; i < jewelryCounts; i++) {
            allJewels[i] = jewelryItems[i];
        }
        return allJewels;
    }

    function diamondDesigning(uint256 uniqueId) public onlyManufacturer { // todo ：珠宝注册
        Jewelry memory newJewelry;
        newJewelry.diamond = diamondRegistry.getDiamond(uniqueId);
        newJewelry.manufacturer = msg.sender;
        uint256 jewelryId = jewelryCounts++;
        jewelryItems[jewelryId] = newJewelry;
    }

    function jewelryPurchase(uint256 jewelryId) public payable {
        uint256 price = jewelryItems[jewelryId].price;
        require(msg.value == price);
        jewelryItems[jewelryId].owner = msg.sender;
    }

    function jewelryVerify(uint256 jewelryId) public view returns (Jewelry memory) {
        return jewelryItems[jewelryId];
    }
}