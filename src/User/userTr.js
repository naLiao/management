import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import cookie from 'react-cookies'
import './user.css';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
        	//当前登录用户
            name:'',
            level:'',
        };
    }
    
    componentWillMount(){
        this.setState({name: cookie.load('user'),level:Number(cookie.load('level'))});
    }
    
    changeUserStatus = (ev)=>{
        let {e,tipShow,currentPage,searchName,editUserData,getUserData,getUserCount} = this.props;
        let newStatus = ev.target.value;
        
    	editUserData(e.id,newStatus);
    	
    	setTimeout(function(){
            getUserData(currentPage);
            getUserCount(searchName);
            tipShow('修改成功');
        },50);
    }
    
    //删除会员
    delInTr = ()=>{
        let {del,tipShow,e} = this.props;
        let {level} = this.state;
        if(level>1){
            tipShow('您的级别不够');
        }else{
            del(e.id);
        }
    }
    
    render(){
        let {e,i} = this.props;
        // let {com} = this.state;
        
        let d = new Date();
        d.setTime(d.getTime(e.time));
        let time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        
        return (
            <tr>
                <td>{i+1}</td>
                <td>{e.username}</td>
                <td>{e.phone}</td>
                <td>{time}</td>
                <td>
                    <select 
                        name="" 
                        id="userStatus"
                        value={e.status}
                        onChange={this.changeUserStatus}
                    >
                        <option value="normal">正常</option>
                        <option value="stop">禁用</option>
                    </select>
                </td>
                <td>
                    <button 
                        onClick={this.delInTr}
                    className="red"><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}

export default connect((state)=>{
    return {data:state.reduceruser};
},(dispatch)=>{
    return bindActionCreators(actionCreators,dispatch);
})(Tr);