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
        default:
            return state;
    }
}

function diamondRegistry(state = 0, action) { //跟actions关联
    switch (action.type) {
        case "DIAMOND_REGISTRY_LOADED":
            return { ...state, loaded: true, contract: action.contract }
        default:
            return state;
    }
}

function rawDiamondRegistry(state = 0, action) { //跟actions关联
    switch (action.type) {
        case "RAW_DIAMOND_REGISTRY_LOADED":
            return { ...state, loaded: true, contract: action.contract }
        default:
            return state;
    }
}

function jewelryShop(state = 0, action) { //跟actions关联
    switch (action.type) {
        case "JEWELRY_SHOP_LOADED":
            return { ...state, loaded: true, contract: action.contract }
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