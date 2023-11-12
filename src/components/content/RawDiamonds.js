import React, { Component } from "react"

import { connect } from "react-redux"
import { allCompaniesLoadedSelector, allRawDiamondsSelector } from "../../store/selectors"
import Spinner from "../utils/Spinner"

const showAllRawDiamonds = (allRawDiamonds) => {
    return (
        <tbody>
            {allRawDiamonds.map(
                (rawDiamond) => {
                    console.log("rawDiamond :", rawDiamond)
                    return (
                        <tr key={rawDiamond.rawId.toString()}>
                            <td>{rawDiamond.rawId.toString()}</td>
                            <td>{rawDiamond.miningCompany}</td>
                            <td>{rawDiamond.cuttingCompany}</td>
                        </tr>
                        
                    )

                })}
        </tbody>
    )
}
class RawDiamonds extends Component {

    render() {
        return (
            <div className="vertical">
                <div className="card bg-dark text-white">
                    <div className="card-header">Raw Diamonds</div>
                    <div className="card-body">
                        <table className="table table-dark table-sm small">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Mining Company</th>
                                    <th>Cutting Company</th>
                                </tr>
                            </thead>
                            {this.props.allRawDiamondsLoaded ? showAllRawDiamonds(this.props.allRawDiamonds) : <Spinner type="table" />}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
       allRawDiamondsLoaded : allCompaniesLoadedSelector(state),
       allRawDiamonds: allRawDiamondsSelector(state)
    }
}

export default connect(mapStateToProps)(RawDiamonds)