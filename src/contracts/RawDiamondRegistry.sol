// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CompanyRegistry.sol";

contract RawDiamondRegistry {
    struct RawDiamond {
        uint256 rawId;
        address miningCompany;
        address cuttingCompany;
        // address gradingLab;
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

    function rawDiamondRegister() public onlyMiningCompany returns (uint256) {
        RawDiamond memory newRawDiamond;
        newRawDiamond.rawId = rawDiamondCounts;
        newRawDiamond.miningCompany = msg.sender;
        uint256 rawId = rawDiamondCounts++;
        rawDiamondItems[rawId] = newRawDiamond;
        return rawId;
    }

    function rawDiamondCutting(
        uint256 rawId
    ) public onlyCuttingCompany returns (uint256) {
        rawDiamondItems[rawId].cuttingCompany = msg.sender;
        return rawId;
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
