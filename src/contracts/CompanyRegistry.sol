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
        CompanyType companyType;
        address addr;
    }

    mapping(address => Company) public companies;
    uint256 public companiesCount;

    function companyRegister(CompanyType companyType) public {
        Company memory newCompany = Company(companyType, msg.sender);
        companies[msg.sender] = newCompany;
        companiesCount++;
    }

    function getCompanyType(address companyAddress) public view returns (CompanyType) {
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