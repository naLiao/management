import React from 'react';
import './header.css';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            avatarOnOff:false
        };
    }
    click = ()=>{
        let {avatarOnOff} = this.state;
        if(avatarOnOff){
            this.refs.list.style.opacity = 0;
        }else{
            this.refs.list.style.opacity = 1;
        }
        avatarOnOff = !avatarOnOff;
        this.setState({avatarOnOff});
    }
    render(){
        return (
            <header id="header">
                <div className="headerLBox"><span></span>新闻后台管理系统</div>
                <ul className="headerRBox">
                    <li>
                        <div className="searchForm">
                            <input type="text" placeholder="请搜索" class="input" />
                            <button id="searchBtn" className="fa fa-search"></button>
                        </div>
                    </li>
                    <li className="notice">
                        <a>
                            <i className="fa fa-bell-o"></i>
                            <span className="count">5</span>
                        </a>
                    </li>
                    <li className="user" onClick={this.click}>
                        <a>
                            <img className="avatar" src={require('../images/avatar.jpg')}/>
                            <span>admin</span>
                            <i className="triangle"></i>
                        </a>
                        <ul className="list" ref="list">
                            <li>个人中心</li>
                            <li>设置</li>
                            <li className="divider"></li>
                            <li>退出</li>
                        </ul>
                    </li>
                </ul>
            </header>
        )
    }
}
export default Header;