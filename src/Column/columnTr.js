import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import cookie from 'react-cookies'

class ColumnTr extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            //当前登录用户
            name:'',
            level:''
         };
    }

    componentWillMount(){
        this.setState({name: cookie.load('user'),level:Number(cookie.load('level'))});
    }

    //修改栏目
    showInTr = ()=>{
        let {show,tipShow,e} = this.props;
        let {level} = this.state;
        if(level>2){
            tipShow('您的级别不够');
        }else{
            show(e);
        }
    }
    //删除栏目
    delInTr = ()=>{
        let {del,tipShow,e} = this.props;
        let {level} = this.state;
        if(level>2){
            tipShow('您的级别不够');
        }else{
            del(e.id);
        }
    }

    //提示框弹出
    tipShow = (info)=>{
        this.setState({isTipShow:true,tipInfo:info});
        let that = this;
        setTimeout(function(){
            that.setState({isTipShow:false,tipInfo:''});
        },1000)
    }

    //点击勾选
    checkInTr = (ev)=>{
        let {e,cc,dataColumn,isCheckAll} = this.props;
        e.checked = !e.checked;
        console.log(e.checked);

        isCheckAll = dataColumn.every(e=>e.checked);
        console.log(isCheckAll);
        
        cc(isCheckAll);
        this.setState({dataColumn});
        console.log(dataColumn);
    }

    render(){
        let {i,e} = this.props;
        let d = new Date();
        d.setTime(d.getTime(e.time));
        let time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        return (
            <tr>
                <td><input 
                    type="checkbox" 
                    checked={e.checked?'checked':''}
                    onChange={this.checkInTr}
                /></td>
                <td>{e.column}</td>
                <td>{e.path}</td>
                {/* <td>{e.readNum}</td> */}
                <td>{e.approve}</td>
                <td>{time}</td>
                <td>
                    <button
                        onClick={this.showInTr}
                    ><i className="fa fa-pencil"></i></button>
                    <button 
                        onClick={this.delInTr}
                    className="red"><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}
export default connect((state)=>{
    return {
        dataColumn:state.reducercolumn.columns,
    };
},dispatch=>bindActionCreators(actionCreators,dispatch))(ColumnTr);