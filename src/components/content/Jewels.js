import React, { Component } from "react"

import { connect } from "react-redux"

import Spinner from "../utils/Spinner"
import { allJewelsLoadedSelector, allJewelsSelector } from "../../store/selectors"

const showJewels = (allJewels) => {
    
    return (
        <tbody>
            {allJewels.map(
                (jewel) => {
            
                    return (
                        <tr key={jewel.jewelryId.toString()}>
                            <td>{jewel.jewelryId.toString()}</td>
                            <td>{jewel.manufacturer}</td>
                        </tr>
                    )
                })}
        </tbody>
    )
}
class Jewels extends Component {

    render() {
        return (
            <div className="vertical">
                <div className="card bg-dark text-white">
                    <div className="card-header">Jewels</div>
                    <div className="card-body">
                        <table className="table table-dark table-sm small">
                            <thead>
                                <tr>
                                    <th>Jewelry Id</th>
                                    <th>manufacturer</th>
                                </tr>
                            </thead>
                            {this.props.allJewelsLoaded ? showJewels(this.props.allJewels) : <Spinner type="table" />}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
       allJewelsLoaded : allJewelsLoadedSelector(state),
       allJewels: allJewelsSelector(state)
    }
}

export default connect(mapStateToProps)(Jewels)