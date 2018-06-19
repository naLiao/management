import React from 'react';
import {NavLink} from 'react-router-dom';
import './column.css';
import Tr from '../MyArticle/tr';

class Column extends React.Component {
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
                    status:'审核中',
                    time:'2018-6-5'
                },
                {
                    id:6,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    status:'审核中',
                    time:'2018-6-5'
                },
                {
                    id:7,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    status:'审核中',
                    time:'2018-6-5'
                },
                {
                    id:8,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    status:'审核中',
                    time:'2018-6-5'
                },
                {
                    id:9,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    status:'审核中',
                    time:'2018-6-5'
                },
                {
                    id:10,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    status:'审核中',
                    time:'2018-6-5'
                }
            ]
         };
    }
    render(){
        let {url:{location:{pathname}}} = this.props;
        let arr=[];
        switch(pathname){
            case '/column/headline':
                arr=this.state.arr;
                break;
            case '/column':
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
                        <li><NavLink to="/column/headline" className="active">头条</NavLink></li>
                        <li><NavLink to="/column/current" className="active">时事</NavLink></li>
                        <li><NavLink to="/column/finance" className="active">财经</NavLink></li>
                        <li><NavLink to="/column/life" className="active">生活</NavLink></li>
                    </ul>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        <button><i className="fa fa-plus"></i>添加</button>
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
                    </div>
                </div>
            </div>
        )
    }
}
export default Column;