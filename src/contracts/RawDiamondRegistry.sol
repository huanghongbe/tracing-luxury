// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CompanyRegistry.sol";

contract RawDiamondRegistry {
    struct RawDiamond {
        uint256 rawId;
        string rawDiamondName;
        string rawDiamondColor;
        string cuttingGrade;
        CompanyRegistry.Company miningCompany;
        CompanyRegistry.Company cuttingCompany;
        //time
        uint256 minedTime;
        uint256 cuttingTime; 
    }

    mapping(uint256 => RawDiamond) public rawDiamondItems;
    uint256 public rawDiamondCounts;

    CompanyRegistry private companyRegistry;

    constructor(address _companyRegistry) {
        companyRegistry = CompanyRegistry(_companyRegistry);
    }

    function getAllRawDiamonds() public view returns (RawDiamond[] memory) {
        RawDiamond[] memory allRawDiamonds = new RawDiamond[](rawDiamondCounts);
        for (uint i = 0; i < rawDiamondCounts; i++) {
            allRawDiamonds[i] = rawDiamondItems[i];
        }
        return allRawDiamonds;
    }

    function getRawDiamond(
        uint256 rawId
    ) public view returns (RawDiamond memory) {
        return rawDiamondItems[rawId];
    }

    function rawDiamondRegister(string calldata _rawDiamondName,string calldata _rawDiamondColor) public onlyMiningCompany returns (uint256) {
        RawDiamond memory newRawDiamond;
        newRawDiamond.rawId = rawDiamondCounts;
        newRawDiamond.rawDiamondName = _rawDiamondName;
        newRawDiamond.rawDiamondColor = _rawDiamondColor;
        CompanyRegistry.Company memory miningCompany = companyRegistry.getCompany(msg.sender);
        newRawDiamond.miningCompany = miningCompany;
        uint256 rawId = rawDiamondCounts++;
        newRawDiamond.minedTime = block.timestamp;
        rawDiamondItems[rawId] = newRawDiamond;
        return rawId;
    }

    function rawDiamondCutting(
        uint256 _rawId,string calldata  _cuttingGrade
    ) public onlyCuttingCompany returns (uint256) {
        CompanyRegistry.Company memory cuttingCompany = companyRegistry.getCompany(msg.sender);
        rawDiamondItems[_rawId].cuttingCompany = cuttingCompany;
        rawDiamondItems[_rawId].cuttingGrade = _cuttingGrade;
        rawDiamondItems[_rawId].cuttingTime = block.timestamp;
        return _rawId;
    }

    modifier onlyMiningCompany() {
        require(
            companyRegistry.getCompanyType(msg.sender) ==
                CompanyRegistry.CompanyType.Mining,
            "You are not the miners!"
        );
        _;
    }

    modifier onlyCuttingCompany() {
        require(
            companyRegistry.getCompanyType(msg.sender) ==
                CompanyRegistry.CompanyType.Cutting,
            "You are not the Cutters!"
        );
        _;
    }
}
