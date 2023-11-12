import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountSelector, companyRegistrySelector, diamondRegistryLoadedSelector, diamondRegistrySelector, jewelryShopSelector, rawDiamondRegistrySelector } from '../../store/selectors'
import { loadAllCompanies, loadAllDiamonds, loadAllJewels, loadAllRawDiamonds, loadWeb3 } from '../../store/interaction'
import Companies from './Companies'
import RawDiamonds from './RawDiamonds'
import Diamonds from './Diamonds'
import Jewels from './Jewels'

class Content extends Component {

    componentDidMount() {

        this.loadBlockchainData(this.props.dispatch);
    }

    async loadBlockchainData(dispatch) {

        await loadAllCompanies(this.props.companyRegistry, dispatch) //this.props.companyRegistry 从selectors里面拿
        await loadAllRawDiamonds(this.props.rawDiamondRegistry, dispatch)
        await loadAllDiamonds(this.props.diamondRegistry, dispatch)
        await loadAllJewels(this.props.jewelryShop, dispatch)
    }

    render() {
        return (
            <div className="content">
                <div className="vertical-split">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Wanna Verify?</p>
                            <a href="/#" className="card-link">click to verify</a>
                        </div>
                    </div>
                    <div className="card bg-dark text-white">
                        <div className="card-header">My stuff</div>
                        <div className="card-body">
                            <p className="card-text">Wanna see your personl stuff? </p>
                            <a href="/#" className="card-link">click to see</a>
                        </div>
                    </div>
                </div>

                <div className="vertical">
                    <Jewels></Jewels>
                </div>

                <div className="vertical-split">
                    <Companies></Companies>
                    <RawDiamonds></RawDiamonds>
                    {/* <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="/#" className="card-link">Card link</a>
                        </div>
                    </div> */}
                    {/* <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="/#" className="card-link">Card link</a>
                        </div>
                    </div> */}
                </div>

                <div className="vertical">
                    <Diamonds></Diamonds>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        account: accountSelector(state),
        companyRegistry: companyRegistrySelector(state),
        rawDiamondRegistry: rawDiamondRegistrySelector(state),
        diamondRegistry: diamondRegistrySelector(state),
        jewelryShop: jewelryShopSelector(state)
    }
}

export default connect(mapStateToProps)(Content)