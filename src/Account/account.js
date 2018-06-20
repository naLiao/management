import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './account.css';
import Tr from './accountTr';

class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            arr:[
                {
                    id:1,
                    name:'李二',
                    kind:'超级管理员',
                    level:1,
                    time:'2018-6-5',
                },
                {
                    id:2,
                    name:'李二',
                    kind:'主编',
                    level:2,
                    time:'2018-6-5',
                },
                {
                    id:3,
                    name:'李二',
                    kind:'主编',
                    level:2,
                    time:'2018-6-5',
                },
                {
                    id:4,
                    name:'李二',
                    kind:'编辑',
                    level:5,
                    time:'2018-6-5',
                },
                {
                    id:5,
                    name:'李二',
                    kind:'编辑',
                    level:5,
                    time:'2018-6-5',
                }
            ]
         };
    }
    render(){
        let {arr} = this.state;
        let newArr = arr.map((e,i)=>{
            let obj={
                key:i,
                id:e.id,
                name:e.name,
                kind:e.kind,
                level:e.level,
                time:e.time
            }
            return <Tr {...obj} />;
        })
        return (
            <div className="content1">
                <div className="table_top">
                    <div className="big">搜索查询</div>
                    <div className="tab_search">
                        <span>名字</span>
                        <input type="text" placeholder="请输入"/>
                        <span>账户种类</span>
                        <select id="account_kind">
                            <option value="admin">超级管理员</option>
                            <option value="charge">主编</option>
                            <option value="editor">编辑</option>
                        </select>
                        <button>查询</button>
                    </div>
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
                            <th>名字</th>
                            <th>账户种类</th>
                            <th>级别</th>
                            <th>上次登录时间</th>
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
                            {/* <li><a>2</a></li> */}
                            {/* <li><a>3</a></li> */}
                        </ul>
                        <span className="total">共5条</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Account;