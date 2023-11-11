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
    jewelryShopLoaded
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

export const loadAllCompanys = async (web3, companyRegistry, dispatch) => {
    // todo 改成获取全部公司
    const account = await loadAccount(web3, dispatch);
    console.log('账号-----》', account);
  
    const result = await companyRegistry.methods.companyRegister(0, { from: account }).call();
    console.log(result);

    
    if (web3.utils.isAddress(account)) {
      const result2 = await companyRegistry.methods.getCompanyType(account).call();
      console.log("公司类型-----》", result2);
    } else {
      console.log("地址不合法");
    }
  };




