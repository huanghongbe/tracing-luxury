// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./RawDiamondRegistry.sol";
import "./CompanyRegistry.sol";

contract DiamondRegistry {
    struct Diamond {
        uint256 uniqueId;
        CompanyRegistry.Company gradingLab;
        string clarity;
        uint256 grade;
        RawDiamondRegistry.RawDiamond rawDiamond;
        //time
        uint256 registerTime;
    }

    mapping(uint256 => Diamond) public diamondItems;
    uint256 public diamondCounts;

    RawDiamondRegistry private rawDiamondRegistry;
    CompanyRegistry private companyRegistry;

    constructor(address _rawDiamondRegistry, address _companyRegistry) {
        rawDiamondRegistry = RawDiamondRegistry(_rawDiamondRegistry);
        companyRegistry = CompanyRegistry(_companyRegistry);
    }

    function getAllDiamonds() public view returns (Diamond[] memory) {
        Diamond[] memory allDiamonds = new Diamond[](diamondCounts);
        for (uint i = 0; i < diamondCounts; i++) {
            allDiamonds[i] = diamondItems[i];
        }
        return allDiamonds;
    }

    function getDiamond(uint256 uniqueId) public view returns (Diamond memory) {
        return diamondItems[uniqueId];
    }

    function diamondRegister(
        uint256 rawId,
        string calldata clarity,
        uint256 grade
    ) public onlyGradingCompany returns (uint256) {
        RawDiamondRegistry.RawDiamond memory rawDiamond = rawDiamondRegistry
            .getRawDiamond(rawId);
        require(
            rawDiamond.cuttingCompany.addr != address(0) &&
                rawDiamond.miningCompany.addr != address(0),
            "this raw diamond haven't been shaped"
        );
        uint256 uniqueId = diamondCounts++;
        CompanyRegistry.Company memory gradingLab = companyRegistry.getCompany(
            msg.sender
        );
        uint256 registerTime = block.timestamp;
        Diamond memory newDiamond = Diamond(
            uniqueId,
            gradingLab,
            clarity,
            grade,
            rawDiamond,
            registerTime
        );
        diamondItems[uniqueId] = newDiamond;
        return uniqueId;
    }

    modifier onlyGradingCompany() {
        require(
            companyRegistry.getCompanyType(msg.sender) ==
                CompanyRegistry.CompanyType.Grading,
            "You are not the graders!"
        );
        _;
    }
}
