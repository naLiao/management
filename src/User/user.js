import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './user.css';
import Tr from './userTr';

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            arr:[
                {
                    id:1,
                    name:'张三',
                    email:'24352345@qq.com',
                    phone:13838985679,
                    commentNum:38,
                    time:'2018-6-5'
                },
                {
                    id:2,
                    name:'张三',
                    email:'24352345@qq.com',
                    phone:13838985679,
                    commentNum:38,
                    time:'2018-6-5'
                },
                {
                    id:3,
                    name:'张三',
                    email:'24352345@qq.com',
                    phone:13838985679,
                    commentNum:38,
                    time:'2018-6-5'
                },
                {
                    id:4,
                    name:'张三',
                    email:'24352345@qq.com',
                    phone:13838985679,
                    commentNum:38,
                    time:'2018-6-5'
                },
                {
                    id:5,
                    name:'张三',
                    email:'24352345@qq.com',
                    phone:13838985679,
                    commentNum:38,
                    time:'2018-6-5'
                },
                {
                    id:6,
                    name:'张三',
                    email:'24352345@qq.com',
                    phone:13838985679,
                    commentNum:38,
                    time:'2018-6-5'
                },
                {
                    id:7,
                    name:'张三',
                    email:'24352345@qq.com',
                    phone:13838985679,
                    commentNum:38,
                    time:'2018-6-5'
                },
                {
                    id:8,
                    name:'张三',
                    email:'24352345@qq.com',
                    phone:13838985679,
                    commentNum:38,
                    time:'2018-6-5'
                },
                {
                    id:9,
                    name:'张三',
                    email:'24352345@qq.com',
                    phone:13838985679,
                    commentNum:38,
                    time:'2018-6-5'
                },
                {
                    id:10,
                    name:'张三',
                    email:'24352345@qq.com',
                    phone:13838985679,
                    commentNum:38,
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
                id:e.id,
                name:e.name,
                email:e.email,
                phone:e.phone,
                commentNum:e.commentNum,
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
                            <th>邮箱</th>
                            <th>手机号</th>
                            <th>评论次数</th>
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
                            <li><a>2</a></li>
                            <li><a>3</a></li>
                        </ul>
                        <span className="total">共25条</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default User;