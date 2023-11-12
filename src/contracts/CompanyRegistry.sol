// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract CompanyRegistry {
    enum CompanyType {
        Mining,
        Cutting,
        Grading,
        Manufacturer
    }

    struct Company {
        uint256 companyId;
        CompanyType companyType;
        address addr;
    }

    mapping(address => Company) public companies;

    mapping(uint256=>address) public indexMap;
    uint256 public companiesCount;

    function getAllCompanies() public view returns (Company[] memory) {
        Company[] memory allCompanies = new Company[](companiesCount);
        uint256 index = 0;
        for (uint256 i = 0; i < companiesCount; i++) {
            if (companies[indexMap[i]].addr != address(0)) {
                allCompanies[index] = companies[indexMap[i]];
                index++;
            }
        }
        return allCompanies;
    }

    function companyRegister(CompanyType companyType) public {
        //todo 相同地址重复注册
        Company memory newCompany = Company(companiesCount,companyType, msg.sender);
        companies[msg.sender] = newCompany;
        indexMap[companiesCount] = msg.sender;
        companiesCount++;
    }

    function getCompanyType(
        address companyAddress
    ) public view returns (CompanyType) {
        return companies[companyAddress].companyType;
    }

    modifier onlyMiningCompany() {
        Company memory company = companies[msg.sender];
        require(
            company.companyType == CompanyType.Mining,
            "You are not the miners!"
        );
        _;
    }

    modifier onlyCuttingCompany() {
        Company memory company = companies[msg.sender];
        require(
            company.companyType == CompanyType.Cutting,
            "You are not the Cutters!"
        );
        _;
    }

    modifier onlyGradingCompany() {
        Company memory company = companies[msg.sender];
        require(
            company.companyType == CompanyType.Grading,
            "You are not the graders!"
        );
        _;
    }

    modifier onlyManufacturer() {
        Company memory company = companies[msg.sender];
        require(
            company.companyType == CompanyType.Manufacturer,
            "You are not the manufacturers!"
        );
        _;
    }
}
