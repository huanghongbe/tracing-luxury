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