import React from 'react';
import {withRouter} from 'react-router-dom';
import './header.css';
import cookie from 'react-cookies'

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            level:''
        };
    }

    componentWillMount(){
        this.setState({name: cookie.load('user'),level:Number(cookie.load('level'))});
    }

    //点击让头像下方的设置列表出现
    click = ()=>{
        let {avatarOnOff} = this.state;
        if(avatarOnOff){
            this.refs.list.style.opacity = 0;
            this.refs.list.style.height = 0;
        }else{
            this.refs.list.style.opacity = 1;
            this.refs.list.style.height = '110px';
        }
        avatarOnOff = !avatarOnOff;
        this.setState({avatarOnOff});
    }

    //点击退出
    logout = ()=>{
        let {history} = this.props;
        let {name,level} = this.state;
        // var expTime  = new Date();
        // expTime.setTime(expTime.getTime()-1000);
        cookie.remove('user', { path: '/' })
        cookie.remove('level', { path: '/' })
        // document.cookie = 'user='+' '+';expires='+ expTime.toUTCString();
        // document.cookie = 'level= ;expires='+ expTime.toUTCString();
        setTimeout(()=>{
            history.push('/');
        },500);
    }

    render(){
        let {name,level} = this.state;
        let levelName;
        switch(level){
            case 1:
                levelName = '超级管理员';
                break;
            case 2:
                levelName = '主编';
                break;
            case 5:
                levelName = '编辑';
                break;
            default:
                levelName = '编辑';
        }
        return (
            <header id="header">
                <div className="headerLBox"><span></span>新闻后台管理系统</div>
                <ul className="headerRBox">
                    {/* <li>
                        <div className="searchForm">
                            <input type="text" placeholder="请搜索" className="input" />
                            <button id="searchBtn" className="fa fa-search"></button>
                        </div>
                    </li>
                    <li className="notice">
                        <a>
                            <i className="fa fa-bell-o"></i>
                            <span className="count">5</span>
                        </a>
                    </li> */}
                    <li className="user" onClick={this.click}>
                        <span>欢迎回来，{name}</span>
                        <span>{levelName}</span>
                    </li>
                    <li onClick={this.logout}>
                        <button className="logout">退出</button>
                    </li>
                </ul>
            </header>
        )
    }
}
export default withRouter(Header);