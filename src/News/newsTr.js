import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    //修改新闻
    showInTr = ()=>{
        let {show,e} = this.props;
        show(e);
    }
    //删除新闻
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
        let {e,cc,dataNews,isCheckAll} = this.props;
        e.checked = !e.checked;
        // console.log(e.checked);

        isCheckAll = dataNews.every(e=>e.checked);
        // console.log(isCheckAll);
        
        cc(isCheckAll);
        this.setState({dataNews});
        console.log(dataNews);
    }

    render(){
        let {e,i} = this.props;
        // console.log(i);
        
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
                circleClass = 'orange';
                break;
            case '已退回':
                circleClass = 'red';
                break;
            default:
                circleClass = 'green';
        }
        circleClass += ' circle fa fa-circle';
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
                <td>{i+1}</td>
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
                        onClick={this.showInTr}
                    ><i className="fa fa-pencil"></i></button>
                    <button 
                        className="red"
                        onClick={this.delInTr}
                    ><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}
export default connect((state)=>{
    return {
        dataNews:state.reducernews.news
    };
},dispatch=>bindActionCreators(actionCreators,dispatch))(Tr);