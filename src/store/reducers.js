import { combineReducers } from 'redux'
function web3(state = 0, action) { //跟actions关联
    switch (action.type) {
        case "WEB3_LOADED":
            return { ...state, connection: action.connection }
        case "WEB3_ACCOUNT_LOADED":
            return { ...state, account: action.account }
        default:
            return state;
    }
}

function companyRegistry(state = 0, action) { //跟actions关联
    switch (action.type) {
        case "COMPANY_REGISTRY_LOADED":
            return { ...state, loaded: true, contract: action.contract }
        case "ALL_COMPANIES_LOADED":
            return { ...state, allCompanies: { loaded: true, data: action.allCompanies } }
        default:
            return state;
    }
}

function diamondRegistry(state = 0, action) { //跟actions关联
    switch (action.type) {
        case "DIAMOND_REGISTRY_LOADED":
            return { ...state, loaded: true, contract: action.contract }
        case "ALL_DIAMONDS_LOADED":
            return { ...state, allDiamonds: { loaded: true, data: action.allDiamonds } }
        default:
            return state;
    }
}

function rawDiamondRegistry(state = 0, action) { //跟actions关联
    switch (action.type) {
        case "RAW_DIAMOND_REGISTRY_LOADED":
            return { ...state, loaded: true, contract: action.contract }
        case "ALL_RAW_DIAMONDS_LOADED":
            return { ...state, allRawDiamonds: { loaded: true, data: action.allRawDiamonds } }
        default:
            return state;
    }
}

function jewelryShop(state = 0, action) { //跟actions关联
    switch (action.type) {
        case "JEWELRY_SHOP_LOADED":
            return { ...state, loaded: true, contract: action.contract }
        case "ALL_JEWELS_LOADED":
            return { ...state, allJewels: { loaded: true, data: action.allJewels } }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    web3,
    companyRegistry,
    diamondRegistry,
    rawDiamondRegistry,
    jewelryShop
})

export default rootReducer