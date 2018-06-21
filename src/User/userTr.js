import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import './user.css';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = {  };
    }
    changeUserStatus = (ev)=>{
        let {id,showDel,changeId} = this.props;
        let status = ev.target.value;
        //显示确认弹框
        if(status==='stop'){
            showDel(true);
        }
        changeId(id);
    }
    render(){
        let {id,name,email,phone,commentNum,status,time} = this.props;
        let {com} = this.state;
        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{commentNum}</td>
                <td>{time}</td>
                <td>
                    <select 
                        name="" 
                        id="userStatus"
                        value={status}
                        onChange={this.changeUserStatus}
                    >
                        <option value="normal">正常</option>
                        <option value="stop">禁用</option>
                    </select>
                </td>
                <td>
                    <button><i className="fa fa-pencil"></i></button>
                    <button className="red"><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}

export default connect((state)=>{
    return {data:state.reduceruser};
},(dispatch)=>{
    return {actions:bindActionCreators(actionCreators,dispatch)};
})(Tr);