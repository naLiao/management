import React from 'react';
import {Link,NavLink} from 'react-router-dom';
import './sidebar.css';

class SideBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render(){
        return (
            <div id="sideBar">
                <ul className="nav">
                    <li>
                        <NavLink to="/index" activeClassName="active"><i className="fa fa-desktop"></i>
                            <span>首页</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myarticle" activeClassName="active"><i className="fa fa-file-text-o"></i>
                            <span>我的稿件</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/news" activeClassName="active"><i className="fa fa-newspaper-o"></i>
                            <span>新闻管理</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/column" activeClassName="active"><i className="fa fa-columns"> </i>
                            <span>栏目管理</span>
                        </NavLink>
                    </li>
                    <li><NavLink to="/account" activeClassName="active"><i className="fa fa-tags"></i>
                            <span>权限管理</span>
                        </NavLink>
                    </li>
                    <li><NavLink to="/user" activeClassName="active"><i className="fa fa-user"></i>
                            <span>会员管理</span>
                        </NavLink>
                    </li>
                    <li><NavLink to="/setting" activeClassName="active"><i className="fa fa-cogs"></i>
                            <span>系统设置</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
export default SideBar;