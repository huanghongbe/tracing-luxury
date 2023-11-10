// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CompanyRegistry.sol";

contract RawDiamondRegistry {
    struct RawDiamond {
        uint256 rawId;
        address miningCompany;
        address cuttingCompany;
        address gradingLab;
    }

    mapping(uint256 => RawDiamond) public rawDiamondItems;
    uint256 public rowDiamondCounts;

    CompanyRegistry private companyRegistry;

    constructor(address _companyRegistry) {
        companyRegistry = CompanyRegistry(_companyRegistry);
    }

    function getRawDiamond(uint256 rawId) public view returns(RawDiamond memory){
        return rawDiamondItems[rawId];
    }
    function rawDiamondRegister() public onlyMiningCompany returns (uint256) {
        RawDiamond memory newRawDiamond;
        newRawDiamond.rawId = rowDiamondCounts;
        newRawDiamond.miningCompany = msg.sender;
        uint256 rowId = rowDiamondCounts++;
        rawDiamondItems[rowId] = newRawDiamond;
        return rowId;
    }

    function rawDiamondCutting(uint256 rowId) public onlyCuttingCompany returns (uint256) {
        rawDiamondItems[rowId].cuttingCompany = msg.sender;
        return rowId;
    }

    function diamondGrading(uint256 rowId) public onlyGradingCompany returns (uint256) {
        rawDiamondItems[rowId].gradingLab = msg.sender;
        return rowId;
    }

    modifier onlyMiningCompany() {
        require(
            companyRegistry.getCompanyType(msg.sender) == CompanyRegistry.CompanyType.Mining,
            "You are not the miners!"
        );
        _;
    }

    modifier onlyCuttingCompany() {
        require(
            companyRegistry.getCompanyType(msg.sender) == CompanyRegistry.CompanyType.Cutting,
            "You are not the Cutters!"
        );
        _;
    }

    modifier onlyGradingCompany() {
        require(
            companyRegistry.getCompanyType(msg.sender) == CompanyRegistry.CompanyType.Grading,
            "You are not the graders!"
        );
        _;
    }
}