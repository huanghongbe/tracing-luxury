import React, { Component } from "react"

import { connect } from "react-redux"

import Spinner from "../utils/Spinner"
import { allDiamondsLoadedSelector, allDiamondsSelector } from "../../store/selectors"

const showAllDiamonds = (allDiamonds) => {
    
    return (
        <tbody>
            {allDiamonds.map(
                (diamond) => {
            
                    return (
                        <tr key={diamond.uniqueId.toString()}>
                            <td>{diamond.uniqueId.toString()}</td>
                            <td>{diamond.gradingLab}</td>
                        </tr>
                    )
                })}
        </tbody>
    )
}
class Diamonds extends Component {

    render() {
        return (
            <div className="vertical">
                <div className="card bg-dark text-white">
                    <div className="card-header">Diamonds</div>
                    <div className="card-body">
                        <table className="table table-dark table-sm small">
                            <thead>
                                <tr>
                                    <th>Unique Id</th>
                                    <th>Grading Lab</th>
                                </tr>
                            </thead>
                            {this.props.allDiamondsLoaded ? showAllDiamonds(this.props.allDiamonds) : <Spinner type="table" />}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
       allDiamondsLoaded : allDiamondsLoadedSelector(state),
       allDiamonds: allDiamondsSelector(state)
    }
}

export default connect(mapStateToProps)(Diamonds)