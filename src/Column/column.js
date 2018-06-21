import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './column.css';
import ColumnTr from './columnTr';
import NewCol from './newcol';

class Column extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            arr:[
                {
                    column:'头条',
                    newsNum:'1234',
                    approve:'张三',
                    path:'/column/headline',
                    time:'2018-6-5'
                },
                {
                    column:'时事',
                    newsNum:'1234',
                    approve:'张三',
                    path:'/column/current',
                    time:'2018-6-5'
                },
                {
                    column:'财经',
                    newsNum:'1234',
                    approve:'张三',
                    path:'/column/finance',
                    time:'2018-6-5'
                },
                {
                    column:'生活',
                    newsNum:'1234',
                    approve:'张三',
                    path:'/column/life',
                    time:'2018-6-5'
                }
            ]
         };
    }
    render(){
        let {arr} = this.state;
        let newArr = arr.map((e,i)=>{
            let obj={
                key:i,
                column:e.column,
                newsNum:e.newsNum,
                approve:e.approve,
                time:e.time,
                path:e.path
            }
            return <ColumnTr {...obj} />;
        })
        return (
            <div className="content1">
                <div className="bread_menu">
                    <Link to="/">首页 --></Link>
                    <Link to="/column">栏目管理</Link>
                </div>
                <div className="table_top">
                    <div className="big">搜索查询</div>
                    <div className="tab_search">
                        <span>栏目名称</span>
                        <input type="text" placeholder="请输入"/>
                        <button>查询</button>
                    </div>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        <Link to="/column/new"><button><i className="fa fa-plus"></i>添加栏目</button></Link>
                        <button><i className="fa fa-pencil"></i>修改栏目</button>
                        <button className="red"><i className="fa fa-trash"></i>删除</button>
                    </div>
                    <table className="newsTable">
                        <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>栏目名称</th>
                            <th>新闻数量</th>
                            <th>主编</th>
                            <th>创建时间</th>
                            <th>栏目新闻</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            {newArr}
                        </tbody>
                    </table>
                    {/* <div className="pageBox">
                        <ul id="pages">
                            <li><a className="active">1</a></li>
                            <li><a>2</a></li>
                            <li><a>3</a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        )
    }
}
export default Column;