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
export const companyRegistrySelector = createSelector(companyRegistry, c => c)



export const contractsLoadedSelector = createSelector(
    diamondRegistryLoaded,
    rawDiamondRegistryLoaded,
    jewelryShopLoaded,
    companyRegistryLoaded,
    (drl, rrl, jsl, crl) => (drl && rrl && jsl && crl)
);