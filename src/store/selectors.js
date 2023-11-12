import { createSelector } from 'reselect'
import { get } from 'lodash'

//const account = state => state.web3.account
const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)


const diamondRegistryLoaded = state => get(state, 'diamondRegistry.loaded', false)
export const diamondRegistryLoadedSelector = createSelector(diamondRegistryLoaded, drl => drl)

const rawDiamondRegistryLoaded = state => get(state, 'rawDiamondRegistry.loaded', false)
export const rawDiamondRegistryLoadedSelector = createSelector(rawDiamondRegistryLoaded, rrl => rrl)

const jewelryShopLoaded = state => get(state, 'jewelryShop.loaded', false)
export const jewelryShopLoadedSelector = createSelector(jewelryShopLoaded, jsl => jsl)

const companyRegistryLoaded = state => get(state, 'companyRegistry.loaded', false)
export const companyRegistryLoadedSelector = createSelector(companyRegistryLoaded, crl => crl)

const companyRegistry = state => get(state, 'companyRegistry.contract')
export const companyRegistrySelector = createSelector(companyRegistry, cr => cr)

const rawDiamondRegistry = state => get(state, 'rawDiamondRegistry.contract')
export const rawDiamondRegistrySelector = createSelector(rawDiamondRegistry, cdr => cdr)

const diamondRegistry = state => get(state, 'diamondRegistry.contract')
export const diamondRegistrySelector = createSelector(diamondRegistry, cdr => cdr)

const jewelryShop = state => get(state, 'jewelryShop.contract')
export const jewelryShopSelector = createSelector(jewelryShop, cdr => cdr)

export const contractsLoadedSelector = createSelector(
    diamondRegistryLoaded,
    rawDiamondRegistryLoaded,
    jewelryShopLoaded,
    companyRegistryLoaded,
    (drl, rrl, jsl, crl) => (drl && rrl && jsl && crl)
);



const allCompaniesLoaded = state => get(state, 'companyRegistry.allCompanies.loaded', false)
export const allCompaniesLoadedSelector = createSelector(allCompaniesLoaded, acl => acl)

// reducer中定义
const allCompanies = state => get(state, 'companyRegistry.allCompanies.data', [])
export const allCompaniesSelector = createSelector(
    allCompanies,
    (companies) => {
        // console.log(companies)
        return companies
    }
)

const allRawDiamondsLoaded = state => get(state, 'rawDiamondRegistry.allRawDiamonds.loaded', false)
export const allRawDiamondsLoadedSelector = createSelector(allRawDiamondsLoaded, ardl => ardl)

const allRawDiamonds = state => get(state, 'rawDiamondRegistry.allRawDiamonds.data', [])
export const allRawDiamondsSelector = createSelector(
    allRawDiamonds,
    (rawDiamonds) => {
        return rawDiamonds
    }
)


const allDiamondsLoaded = state => get(state, 'diamondRegistry.allDiamonds.loaded', false)
export const allDiamondsLoadedSelector = createSelector(allDiamondsLoaded, adl => adl)

const allDiamonds = state => get(state, 'diamondRegistry.allDiamonds.data', [])
export const allDiamondsSelector = createSelector(
    allDiamonds,
    (diamonds) => {
        return diamonds;
    }
)

const allJewelsLoaded = state => get(state, 'jewelryShop.allJewels.loaded', false)
export const allJewelsLoadedSelector = createSelector(allJewelsLoaded, ajl => ajl)

const allJewels = state => get(state, 'jewelryShop.allJewels.data', [])
export const allJewelsSelector = createSelector(
    allJewels,
    (jewels) => {
        return jewels;
    }
)