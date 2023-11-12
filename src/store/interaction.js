import Web3 from 'web3'
import CompanyRegistry from '../abis/CompanyRegistry.json'
import DiamondRegistry from '../abis/DiamondRegistry.json'
import RawDiamondRegistry from '../abis/RawDiamondRegistry.json'
import JewelryShop from '../abis/JewelryShop.json'
import {
    web3Loaded,
    web3AccountLoaded,
    companyRegistryLoaded,
    diamondRegistryLoaded,
    rawDiamondRegistryLoaded,
    jewelryShopLoaded,
    allCompaniesLoaded,
    allRawDiamondsLoaded,
    allDiamondsLoaded,
    allJewelsLoaded
} from './actions'


export const loadWeb3 = (dispatch) => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
    dispatch(web3Loaded(web3))
    return web3
}

export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    dispatch(web3AccountLoaded(account))
    return account
}

export const loadCompanyRegistry = async (web3, networkId, dispatch) => {
    try {
        const companyRegistry = new web3.eth.Contract(CompanyRegistry.abi, CompanyRegistry.networks[networkId].address)
        dispatch(companyRegistryLoaded(companyRegistry))
        return companyRegistry
    } catch (error) {
        window.alert('Contract not deployed')
        return null
    }
}

export const loadDiamondRegistry = async (web3, networkId, dispatch) => {
    try {
        const diamondRegistry = new web3.eth.Contract(DiamondRegistry.abi, DiamondRegistry.networks[networkId].address)
        dispatch(diamondRegistryLoaded(diamondRegistry))
        return diamondRegistry
    } catch (error) {
        window.alert('Contract not deployed')
        return null
    }
}

export const loadRawDiamondRegistry = async (web3, networkId, dispatch) => {
    try {
        const rawDiamondRegistry = new web3.eth.Contract(RawDiamondRegistry.abi, RawDiamondRegistry.networks[networkId].address)
        dispatch(rawDiamondRegistryLoaded(rawDiamondRegistry))
        return rawDiamondRegistry
    } catch (error) {
        console.log('Contract not deployed')
        return null
    }
}

export const loadJewelryShop = async (web3, networkId, dispatch) => {
    try {
        const jewelryShop = new web3.eth.Contract(JewelryShop.abi, JewelryShop.networks[networkId].address)
        dispatch(jewelryShopLoaded(jewelryShop))
        return jewelryShop
    } catch (error) {
        console.log('Contract not deployed')
        return null
    }
}

export const loadAllCompanies = async (companyRegistry, dispatch) => {
    // const account = await loadAccount(web3, dispatch);
    // console.log('账号-----》', account);
    // const result = await companyRegistry.methods.companyRegister(1).send({from : account});
    // console.log(result);
    // if (web3.utils.isAddress(account)) {
    //   const result2 = await companyRegistry.methods.getCompanyType(account).call();
    //   console.log("公司类型-----》", result2);
    // } else {
    //   console.log("地址不合法");
    // }
    let allCompanies = await companyRegistry.methods.getAllCompanies().call();
    console.log("所有公司列表---->", allCompanies);
    allCompanies = decorateCompines(allCompanies);
    dispatch(allCompaniesLoaded(allCompanies))
};

const decorateCompines = (companies) => {
    return (
            companies.map((company) => {
                return company = decorateCompany(company);
            }
        )
    )
}
const decorateCompany = (company) => {
    const miningCompany = '0';
    const cuttingCompany = '1';
    const gradingCompany = '2';
    const manufacturer = '3';
  
    switch (company.companyType.toString()) {
        case miningCompany: company.companyType = "Mining Company";break;
        case cuttingCompany: company.companyType = "Cutting Company";break;
        case gradingCompany: company.companyType = "Grading Company";break;
        case manufacturer: company.companyType = "Manufacturer";break;
    }
    return company;
}


export const loadAllRawDiamonds = async (rawDiamondRegistry, dispatch) => {
    
    let allRawDiamonds = await rawDiamondRegistry.methods.getAllRawDiamonds().call();
    console.log("所有原石列表---->", allRawDiamonds);

    dispatch(allRawDiamondsLoaded(allRawDiamonds))
}

export const loadAllDiamonds = async (diamondRegistry, dispatch) => {
    
    let allDiamonds = await diamondRegistry.methods.getAllDiamonds().call();
    console.log("所有钻石列表---->", allDiamonds);

    dispatch(allDiamondsLoaded(allDiamonds))
};


export const loadAllJewels= async (jewelryShop, dispatch) => {
    
    let allJewels= await jewelryShop.methods.getAllJewels().call();
    console.log("所有珠宝列表---->", allJewels);

    dispatch(allJewelsLoaded(allJewels))
};