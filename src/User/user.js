import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './user.css';
import Tr from './userTr';
import DelBox from './delbox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //是否显示确认删除弹框
            isShowDel:false,
            changeID:0
         };
    }

    //子组件修改时显示弹框 
    showDel = (status)=>{
        this.setState({isShowDel:status});
    }

    //传递当前要禁用的是哪个ID
    changeId = (id)=>{
        this.setState({changeID:id})
    }

    render(){
        let {data} = this.props;
        let {isShowDel,changeID} = this.state;
        let com = isShowDel? <DelBox showDel={this.showDel} changeID={changeID}/> :'';
        let newArr = data.map((e,i)=>{
            let obj={
                key:i,
                id:e.id,
                name:e.name,
                email:e.email,
                phone:e.phone,
                commentNum:e.commentNum,
                time:e.time,
                status:e.status,
                showDel:this.showDel,
                changeId:this.changeId
            }
            return <Tr {...obj} />;
        })
        return (
            <div className="content1">
                <div className="table_top">
                    <div className="big">搜索查询</div>
                    <div className="tab_search">
                        <span>新闻标题</span>
                        <input type="text" placeholder="请输入"/>
                        <button>查询</button>
                    </div>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        {/* <Link to="/user/new"><button><i className="fa fa-plus"></i>添加</button></Link> */}
                        {/* <button><i className="fa fa-pencil"></i>修改</button> */}
                        {/* <button className="red"><i className="fa fa-trash"></i>删除</button> */}
                    </div>
                    <table className="newsTable">
                        <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>ID</th>
                            <th>名字</th>
                            <th>邮箱</th>
                            <th>手机号</th>
                            <th>评论次数</th>
                            <th>上次登录时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            {newArr}
                        </tbody>
                    </table>
                    <div className="pageBox">
                        <ul id="pages">
                            <li><a className="active">1</a></li>
                            <li><a>2</a></li>
                            <li><a>3</a></li>
                        </ul>
                        <span className="total">共25条</span>
                    </div>
                </div>
                {com}
            </div>
        )
    }
}

export default connect((state)=>{
    return {data:state.reduceruser};
},(dispatch)=>{
    return {actions:bindActionCreators(actionCreators,dispatch)};
})(User);