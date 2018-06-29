import React from 'react';
import {withRouter} from 'react-router-dom';
import './header.css';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:false
        };
    }

    componentWillMount(){
        //判断是否登录，获取登录名
        let {history} = this.props;
        if(!document.cookie){
            history.push('/');
        }else{
            let name = document.cookie.split('user=')[1];
            this.setState({name});
        }
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
        document.cookie = '';
    }
    render(){
        let {name} = this.state;
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
                        <a>
                            {/* <img className="avatar" src={require('../images/avatar.jpg')}/> */}
                            <span>欢迎回来，</span>
                            <span>{name}</span>
                            {/* <i className="triangle"></i> */}
                        </a>
                        {/* <ul className="list" ref="list">
                            <li>个人中心</li>
                            <li>设置</li>
                            <li className="divider"></li>
                            <li>退出</li>
                        </ul> */}
                    </li>
                    <li className="logout" onClick={this.logout}>
                        <span>退出</span>
                    </li>
                </ul>
            </header>
        )
    }
}
export default withRouter(Header);