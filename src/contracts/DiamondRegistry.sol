// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./RawDiamondRegistry.sol";

contract DiamondRegistry {
    struct Diamond {
        uint256 uniqueId;
        RawDiamondRegistry.RawDiamond rawDiamond;
    }

    mapping(uint256 => Diamond) public diamondItems;
    uint256 public diamondCounts;

    RawDiamondRegistry private rawDiamondRegistry;

    constructor(address _rawDiamondRegistry) {
        rawDiamondRegistry = RawDiamondRegistry(_rawDiamondRegistry);
    }

    function getDiamond(uint256 uniqueId) public view returns(Diamond memory){
        return diamondItems[uniqueId];
    }

    function diamondRegister(uint256 rowId) public returns (uint256) {
        RawDiamondRegistry.RawDiamond memory rawDiamond = rawDiamondRegistry.getRawDiamond(rowId);
        uint256 uniqueId = diamondCounts++;
        Diamond memory newDiamond = Diamond(uniqueId, rawDiamond);
        diamondItems[uniqueId] = newDiamond;
        return uniqueId;
    }
}