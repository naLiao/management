import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = {  };
    }

    approveInTr = ()=>{
        let {approveFn,e} = this.props;
        approveFn(e);
    }
    showInTr = ()=>{
        let {show,e} = this.props;
        show(e);
    }
    delInTr = ()=>{
        let {del,e} = this.props;
        del(e.id);
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
        let {dataMy,dataApprove,e,cc,dataNews,isCheckAll,kind} = this.props;
        e.checked = !e.checked;
        console.log(kind);
        
        
        // console.log(e.checked);
        if(kind==='my'){
            isCheckAll = dataMy.every(e=>e.checked);
            cc(isCheckAll);
            console.log(isCheckAll);
            this.setState({dataMy});
        }
        if(kind==='approve'){
            isCheckAll = dataApprove.every(e=>e.checked);
            console.log(dataMy);
            cc(isCheckAll);
            this.setState({dataApprove});
        }
    }

    render(){
        let {e,i,isCheckAll} = this.props;
        let circleClass;
        switch(e.status){
            case '草稿箱':
                circleClass = 'blue';
                break;
            case '修改中':
                circleClass = 'red';
                break;
            case '已发布':
                circleClass = 'green';
                break;
            case '审核中':
                circleClass = 'red';
                break;
            default:
                circleClass = 'green';
        }
        circleClass += ' circle fa fa-circle';
        let d = new Date();
        d.setTime(e.time);
        let time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        return (
            <tr>
                <td><input 
                    type="checkbox"
                    checked={e.checked?'checked':''}
                    onClick={this.checkInTr}
                /></td>
                <td>{e._id}</td>
                <td>{e.title}</td>
                <td>{e.column}</td>
                <td>{e.readNum}</td>
                <td>{e.commentNum}</td>
                <td>{e.shareNum}</td>
                <td>{e.editor}</td>
                <td>{e.approve}</td>
                <td>
                    <i className={circleClass}></i>
                    {e.status}
                </td>
                <td>{time}</td>
                <td>
                    <button
                        onClick={this.approveInTr}
                    ><i className="fa fa-check"></i></button>
                    <button
                        onClick={this.showInTr}
                    ><i className="fa fa-pencil"></i></button>
                    <button
                        onClick={this.delInTr}
                        className="red"
                    ><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}
export default connect((state)=>{
    return {
        dataMy:state.reducermyarticle.news,
        dataApprove:state.reducerapprove.news,
    };
},dispatch=>bindActionCreators(actionCreators,dispatch))(Tr);