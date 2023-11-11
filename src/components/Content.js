import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountSelector, companyRegistrySelector } from '../store/selectors'
import { loadAllCompanys,loadWeb3 } from '../store/interaction'


class Content extends Component {

    componentWillMount() {

        this.loadBlockchainData(this.props.dispatch);
    }

    async loadBlockchainData(dispatch) {

        const web3 = loadWeb3(dispatch)

        await loadAllCompanys(web3, this.props.companyRegistry, dispatch) //this.props.companyRegistry 从selectors里面拿

    }

    render() {
        return (
            <div className="content">
                <div className="vertical-split">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="/#" className="card-link">Card link</a>
                        </div>
                    </div>
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="/#" className="card-link">Card link</a>
                        </div>
                    </div>
                </div>

                <div className="vertical">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="/#" className="card-link">Card link</a>
                        </div>
                    </div>
                </div>

                <div className="vertical-split">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="/#" className="card-link">Card link</a>
                        </div>
                    </div>
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="/#" className="card-link">Card link</a>
                        </div>
                    </div>
                </div>

                <div className="vertical">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="/#" className="card-link">Card link</a>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        account: accountSelector(state),
        companyRegistry: companyRegistrySelector(state)
    }
}

export default connect(mapStateToProps)(Content)