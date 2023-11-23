// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CompanyRegistry.sol";
import "./DiamondRegistry.sol";

contract JewelryShop {
  struct Jewelry {
    uint256 jewelryId;
    CompanyRegistry.Company manufacturer;
    address owner;
    DiamondRegistry.Diamond diamond;
    uint256 price;
    bool beingSold;
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
    require(companyRegistry.getCompanyType(msg.sender) == CompanyRegistry.CompanyType.Manufacturer, "You are not the manufacturers!");
    _;
  }

  function transferTo(uint256 _jewelryId, address _to) public {
    require(jewelryItems[_jewelryId].owner == msg.sender);
    require(jewelryItems[_jewelryId].beingSold == false);
    jewelryItems[_jewelryId].owner = _to;
    jewelryItems[_jewelryId].beingSold = false;
  }

  function getAllJewels() public view returns (Jewelry[] memory) {
    Jewelry[] memory allJewels = new Jewelry[](jewelryCounts);
    for (uint i = 0; i < jewelryCounts; i++) {
      allJewels[i] = jewelryItems[i];
    }
    return allJewels;
  }

  function diamondDesigning(uint256 uniqueId, uint256 price) public onlyManufacturer {
    // todo ：珠宝注册
    Jewelry memory newJewelry;
    newJewelry.diamond = diamondRegistry.getDiamond(uniqueId);
    CompanyRegistry.Company memory manufacturer = companyRegistry.getCompany(msg.sender);
    newJewelry.manufacturer = manufacturer;
    newJewelry.owner = msg.sender;
    newJewelry.price = price;
    newJewelry.jewelryId = jewelryCounts;
    newJewelry.beingSold = true;
    jewelryItems[jewelryCounts++] = newJewelry;
  }

  function jewelryPurchase(uint256 jewelryId) public payable {
    // uint256 price = jewelryItems[jewelryId].price;
    // require(msg.value == price);
    require(jewelryItems[jewelryId].owner != msg.sender, "you are the owner");
    require(msg.value == jewelryItems[jewelryId].price * 1 ether, "insufficient payment amount");
    payable(jewelryItems[jewelryId].owner).transfer(jewelryItems[jewelryId].price * 1 ether);
    jewelryItems[jewelryId].beingSold = false;
    jewelryItems[jewelryId].owner = msg.sender;
  }

  function sell(uint256 jewelryId) public {
    require(jewelryItems[jewelryId].owner == msg.sender);
    jewelryItems[jewelryId].beingSold = true;
  }

  function getMyJewels() public view returns (Jewelry[] memory) {
    uint256 count = 0;
    for (uint256 i = 0; i < jewelryCounts; i++) {
      if (jewelryItems[i].owner == msg.sender && jewelryItems[i].beingSold == false) {
        count++;
      }
    }

    Jewelry[] memory myJewels = new Jewelry[](count);
    uint256 index = 0;
    for (uint256 i = 0; i < jewelryCounts; i++) {
      if (jewelryItems[i].owner == msg.sender && jewelryItems[i].beingSold == false) {
        myJewels[index] = jewelryItems[i];
        index++;
      }
    }

    return myJewels;
  }

  function jewelryVerify(uint256 jewelryId) public view returns (Jewelry memory) {
    return jewelryItems[jewelryId];
  }
}
