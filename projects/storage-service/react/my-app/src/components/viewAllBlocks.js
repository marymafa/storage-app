import React, { Component } from 'react';
import axios from 'axios';
import { Redirect , Link} from 'react-router-dom';
import { connect } from "react-redux";
import * as action from "../redux/actions";

class AllBlocks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allBlocks: [],
            selectedUnit: this.props.selections,
            redirect: false,
        }
        this.redirectData = this.redirectData.bind(this)
    }
    componentDidMount() {
        axios.get("http://localhost:3002/blockData").then(result => {
            this.setState({ allBlocks: result.data })
        })
        console.log("this is reaact state", this.state.allBlocks);
    }
    SelectValue = (e) => {
        const data = e.target.value
        this.props.saveSelectedVAlues(data)
        console.log("data", data);

    }
    redirectData() {
        this.setState({
            redirect: true,
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h1>All allBlocks</h1>
                <div className="allBlocks">
                    <label>
                        allBlocks:
                            <select name="allBlockss" onChange={(e) => this.SelectValue(e)} >
                            <option value={0}>select the block</option>
                            {this.state.allBlocks.map(blocks => <option key={blocks.id} value={blocks.id}>{blocks.name}</option>)}
                        </select>
                    </label>
                </div>
                <div>
                <Link to="/view_units" ><button type="button">Next</button></Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        store: state.selectValues,
        selections: state.selectValues.selections,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveSelectedVAlues: (data) => {
            dispatch(action.saveSelect(data))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllBlocks);