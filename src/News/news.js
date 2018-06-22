import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import './news.css';
import Tr from './newsTr';
import Page from '../Page/page';

class News extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            path:''
         };
    }
    render(){
        let {dataNews,dataColumn,url:{location:{pathname}}} = this.props;
        //渲染所有栏目生成二级菜单,dataColumn是栏目数据
        let columnArr = dataColumn.map((e,i)=>{
            let path = '/news/'+e.path;
            return (
                <li key={i}><NavLink to={path} activeClassName="active">{e.column}</NavLink></li>
            )
        })

        //根据路由过滤新闻数据,newsArr是当前栏目所有新闻
        let nowPath = pathname.split('/news/')[1];
        let newsArr = dataNews.filter(e=>{
            return e.path===nowPath;
        })

        //总共多少条数据，到page页里再分页
        let len = newsArr.length;
        let newArr = newsArr.map((e,i)=>{
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
                        {columnArr}
                        {/* <li className="redDotLi">
                            <NavLink to="/myarticle/approve" activeClassName="active">
                                待审核
                            </NavLink>
                            <span className="redDot">5</span>
                        </li> */}
                    </ul>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        <Link to="/edit"><button><i className="fa fa-plus"></i>添加</button></Link>
                        <button><i className="fa fa-pencil"></i>修改</button>
                        <button className="red"><i className="fa fa-trash"></i>删除</button>
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
                            <th>时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            {newArr}
                        </tbody>
                    </table>
                    <Page len={len} />
                </div>
            </div>
        )
    }
}

export default connect((state,ownProps)=>{
    return {
        dataColumn:state.reducercolumn,
        dataNews:state.reducernews,
        url:ownProps.url
    };
},(dispatch)=>{
    return {actions:bindActionCreators(actionCreators,dispatch)};
})(News);