import React, { Component } from "react"

import { connect } from "react-redux"
import { allCompaniesLoadedSelector, allCompaniesSelector } from "../../store/selectors"
import Spinner from "../utils/Spinner"

const showAllCompanies = (allCompanies) => {
    //console.log("showAllCompanies",allCompanies)
    return (
        <tbody>
            {allCompanies.map(
                (company) => {
                    //console.log("company :", company)
                    return (
                        <tr key={company.companyId.toString()}>
                            <td>{company.addr}</td>
                            <td>{company.companyType.toString()}</td>
                        </tr>
                    )

                })}
        </tbody>
    )
}
class Companies extends Component {

    render() {
        return (
            <div className="vertical">
                <div className="card bg-dark text-white">
                    <div className="card-header">All Companies</div>
                    <div className="card-body">
                        <table className="table table-dark table-sm small">
                            <thead>
                                <tr>
                                    <th>addr</th>
                                    <th>type</th>
                                </tr>
                            </thead>
                            {this.props.allCompaniesLoad ? showAllCompanies(this.props.allCompanies) : <Spinner type="table" />}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        allCompaniesLoad: allCompaniesLoadedSelector(state),
        allCompanies: allCompaniesSelector(state)
    }
}

export default connect(mapStateToProps)(Companies)