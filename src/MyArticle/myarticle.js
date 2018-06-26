import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './myarticle.css';
import Tr from './myarticleTr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import Page from '../Page/page';

class MyArticle extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        //根据路由获取数据
        let {dataMy,dataApprove,url} = this.props;
        let pathname = url.location.pathname;
        let arr=[];
        switch(pathname){
            case '/index/myarticle/my':
                arr = dataMy;
                break;
            case '/index/myarticle/approve':
                arr = dataApprove;
                break;
            default:
                arr=dataMy;
        }
        let len = arr.length;
        let newArr = arr.map((e,i)=>{
            let obj={
                key:i,
                id:e.id,
                title:e.title,
                column:e.column,
                readNum:e.readNum,
                commentNum:e.commentNum,
                shareNum:e.shareNum,
                editor:e.editor,
                approve:e.approve,
                status:e.status,
                time:e.time
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
                        <span>日期</span>
                        <input type="text" placeholder="请输入"/>
                        <button>查询</button>
                    </div>
                    <ul className="tab_nav">
                        <li><NavLink to="/index/myarticle/my" activeClassName="active">我的稿件</NavLink></li>
                        <li className="redDotLi">
                            <NavLink to="/index/myarticle/approve" activeClassName="active">
                                待审核
                            </NavLink>
                            <span className="redDot">5</span>
                        </li>
                    </ul>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        <Link to="/edit"><button><i className="fa fa-plus"></i>添加</button></Link>
                        <button><i className="fa fa-pencil"></i>修改</button>
                        <button className="red"><i className="fa fa-trash"></i>批量删除</button>
                    </div>
                    <table className="newsTable">
                        <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>ID</th>
                            <th>标题</th>
                            <th>栏目</th>
                            <th>阅读量</th>
                            <th>评论量</th>
                            <th>转发量</th>
                            <th>编辑</th>
                            <th>主编</th>
                            <th>状态</th>
                            <th>日期</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            {newArr}
                        </tbody>
                    </table>
                    <Page len={len}/>
                </div>
            </div>
        )
    }
}

export default connect((state,ownProps)=>{
    return {
        dataMy:state.reducermyarticle,
        dataApprove:state.reducerapprove,
        url:ownProps.url
    };
},(dispatch)=>{
    return {actions:bindActionCreators(actionCreators,dispatch)};
})(MyArticle);