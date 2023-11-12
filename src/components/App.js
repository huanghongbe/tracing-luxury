import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import {
    loadWeb3,
    loadAccount,
    loadCompanyRegistry,
    loadDiamondRegistry,
    loadJewelryShop,
    loadRawDiamondRegistry
} from '../store/interaction';
import { accountSelector, contractsLoadedSelector } from '../store/selectors'
import Navbar from './navibar/Navbar';
import Content from './content/Content';


class App extends Component {

    componentDidMount() {

        this.loadBlockchainData(this.props.dispatch);
    }

    async loadBlockchainData(dispatch) {
        //const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
        const web3 = loadWeb3(dispatch)
        // const account = await loadAccount(web3, dispatch)

        const networkId = await web3.eth.net.getId()
        console.log("networkId", networkId)
        // const networks = CompanyRegistry.networks

        // console.log("abi", CompanyRegistry.abi)
        // console.log("address", CompanyRegistry.networks[networkId].address)

        const companyRegistry = await loadCompanyRegistry(web3, networkId, dispatch)

        const diamondRegistry = await loadDiamondRegistry(web3, networkId, dispatch)

        const rawDiamondRegistry = await loadRawDiamondRegistry(web3, networkId, dispatch)

        const jewelryShop = await loadJewelryShop(web3, networkId, dispatch)

        if (!companyRegistry || !diamondRegistry || !rawDiamondRegistry || !jewelryShop) {
            window.alert("contracts not deteted")
        }
        // const companyRegister = companyRegistry.methods.companyRegister().call(0,{from : account[0]})
        // console.log("companyRegister",companyRegister)
    }
    render() {

        return (
            <div>
                <Navbar />
                {this.props.contractsLoaded ? <Content /> : <div className='content'></div>}
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        account: accountSelector(state),
        contractsLoaded: contractsLoadedSelector(state)
    }
}
export default connect(mapStateToProps)(App);
