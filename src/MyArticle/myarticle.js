import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './myarticle.css';
import Tr from './myarticleTr';

class MyArticle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //2个数组对应我的稿件、待审核
            arr:[
                {
                    id:1,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'草稿箱',
                    time:'2018-6-5'
                },
                {
                    id:2,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'修改中',
                    time:'2018-6-5'
                },
                {
                    id:3,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'修改中',
                    time:'2018-6-5'
                },
                {
                    id:4,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'已发布',
                    time:'2018-6-5'
                },
                {
                    id:5,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'已发布',
                    time:'2018-6-5'
                },
                {
                    id:6,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'已发布',
                    time:'2018-6-5'
                },
                {
                    id:7,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'已发布',
                    time:'2018-6-5'
                },
                {
                    id:8,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'已发布',
                    time:'2018-6-5'
                },
                {
                    id:9,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'已发布',
                    time:'2018-6-5'
                },
                {
                    id:10,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'已发布',
                    time:'2018-6-5'
                }
            ],
            arr2:[
                {
                    id:1,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'审核中',
                    time:'2018-6-5'
                },
                {
                    id:2,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'审核中',
                    time:'2018-6-5'
                },
                {
                    id:3,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'审核中',
                    time:'2018-6-5'
                },
                {
                    id:4,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'审核中',
                    time:'2018-6-5'
                },
                {
                    id:5,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    approve:'李二',
                    status:'审核中',
                    time:'2018-6-5'
                }
            ]
         };
    }
    render(){
        //根据路由获取数据
        let {url:{location:{pathname}}} = this.props;
        let arr=[];
        switch(pathname){
            case '/myarticle/my':
                arr=this.state.arr;
                break;
            case '/myarticle/approve':
                arr=this.state.arr2;
                break;
            default:
                arr=this.state.arr;
        }
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
                    </div>
                    <ul className="tab_nav">
                        <li><NavLink to="/myarticle/my" activeClassName="active">我的稿件</NavLink></li>
                        <li className="redDotLi">
                            <NavLink to="/myarticle/approve" activeClassName="active">
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
                    <div className="pageBox">
                        <ul id="pages">
                            <li><a className="active">1</a></li>
                            <li><a>2</a></li>
                            <li><a>3</a></li>
                        </ul>
                        <span className="total">共22条</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default MyArticle;