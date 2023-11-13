import React, { Component } from 'react';
import { Modal } from "antd";
import { connect } from 'react-redux';
import { accountSelector, companyRegistrySelector } from '../../store/selectors';
import { companyRegister, loadWeb3 } from '../../store/interaction';

class CompanyRegister extends Component {

    componentDidMount() {
        this.props.onRef && this.props.onRef(this);
    }
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedOption: ''
        };
    }


    isShow = () => {
        let visible = this.state.visible;
        this.setState({ visible: !visible }, () => {
            console.log(this.state.visible);
        });
    }
	
    submit = async(event) => {
        event.preventDefault();
        const selectedOption = document.getElementById("mySelect").value;
        let select;
        switch(selectedOption){
            case 'Mining Company': select = 0;break;
            case 'Cutting Company': select = 1;break;
            case 'Grading Company': select = 2;break;
            case 'Manufacturer': select = 3;break;
        }
        await companyRegister(this.props.account,this.props.companyRegistry,select);
        console.log(selectedOption);
    }

    // 选项变化时更新状态的函数
    handleOptionChange = (event) => {
        this.setState({ selectedOption: event.target.value });
    }

    render() {
        return (
            <div>
                <Modal
                    open={this.state.visible}
                    onOk={() => { this.setState({ visible: false }) }}
                    onCancel={() => { this.setState({ visible: false }) }}
                >
                    <form>
                        <div>
                            <select id="mySelect" onChange={this.handleOptionChange}>
                                <option value="Mining Company">Mining Company</option>
                                <option value="Cutting Company">Cutting Company</option>
                                <option value="Grading Company">Grading Company</option>
                                <option value="Jewelry Shop">Jewelry Shop</option>
                            </select>
                        </div>
                        <button type="submit" onClick={this.submit}>Submit</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        account: accountSelector(state),
        companyRegistry: companyRegistrySelector(state)
    };
}

export default connect(mapStateToProps)(CompanyRegister);