import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import './sidebar.css';

class SideBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render(){
        let {location:{pathname}} = this.props;

        let re1 = /\/index\/(\w+)\/\w+/;
        let re2 = /\/index\/(\w+)/;
        
        let sty = '';
        if(re1.test(pathname)){
            sty = pathname.replace(re1,($0,$1)=>{
                return $1;
            })
        }else if(re2.test(pathname)){
            sty = pathname.replace(re2,($0,$1)=>{
                return $1;
            })
        }
        
        return (
            <div id="sideBar">
                <ul className="nav">
                    <li className={sty==='home'?'active':''}>
                        <Link to="/index/home"><i className="fa fa-desktop"></i>
                            <span>首页</span>
                        </Link>
                    </li>
                    <li className={sty==='myarticle'?'active':''}>
                        <Link to="/index/myarticle/page1"><i className="fa fa-file-text-o"></i>
                            <span>我的稿件</span>
                        </Link>
                    </li>
                    <li className={sty==='news'?'active':''}>
                        <Link to="/index/news/page1"><i className="fa fa-newspaper-o"></i>
                            <span>新闻管理</span>
                        </Link>
                    </li>
                    <li className={sty==='column'?'active':''}>
                        <Link to="/index/column/page1"><i className="fa fa-columns"> </i>
                            <span>栏目管理</span>
                        </Link>
                    </li>
                    <li className={sty==='account'?'active':''}>
                        <Link to="/index/account/page1"><i className="fa fa-tags"></i>
                            <span>权限管理</span>
                        </Link>
                    </li>
                    <li className={sty==='user'?'active':''}>
                        <Link to="/index/user/page1"><i className="fa fa-user"></i>
                            <span>会员管理</span>
                        </Link>
                    </li>
                    <li className={sty==='setting'?'active':''}>
                        <Link to="/index/setting"><i className="fa fa-cogs"></i>
                            <span>系统设置</span>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}
export default withRouter(SideBar);