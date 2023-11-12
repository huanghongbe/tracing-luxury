export function web3Loaded(connection) {
    return {
        type: "WEB3_LOADED",
        connection
    }
}

export function web3AccountLoaded(account) {
    return {
        type: "WEB3_ACCOUNT_LOADED",
        account
    }
}


export function companyRegistryLoaded(contract) {
    return {
        type: "COMPANY_REGISTRY_LOADED",
        contract
    }
}

export function diamondRegistryLoaded(contract) {
    return {
        type: "DIAMOND_REGISTRY_LOADED",
        contract
    }
}

export function jewelryShopLoaded(contract) {
    return {
        type: "JEWELRY_SHOP_LOADED",
        contract
    }
}

export function rawDiamondRegistryLoaded(contract) {
    return {
        type: "RAW_DIAMOND_REGISTRY_LOADED",
        contract
    }
}

export function allCompaniesLoaded(allCompanies){
    return{
        type: "ALL_COMPANIES_LOADED",
        allCompanies
    }
}

export function allRawDiamondsLoaded(allRawDiamonds){
    return{
        type: "ALL_RAW_DIAMONDS_LOADED",
        allRawDiamonds
    }
}

export function allDiamondsLoaded(allDiamonds){
    return{
        type: "ALL_DIAMONDS_LOADED",
        allDiamonds
    }
}

export function allJewelsLoaded(allJewels){
    return{
        type: "ALL_JEWELS_LOADED",
        allJewels
    }
}


