import React from 'react';
import {Link} from 'react-router-dom';
import './sidebar.css';

class SideBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newsEditOnOff:false
        };
    }
    click=()=>{
        let {newsEditOnOff} = this.state;
        if(newsEditOnOff){
            this.refs.editUl.style.height = 0;
        }else{
            this.refs.editUl.style.height = '105px';
        }
        newsEditOnOff = !newsEditOnOff;
        this.setState({newsEditOnOff});
    }
    render(){
        return (
            <div id="sideBar">
                <ul className="nav">
                    <li>
                        <Link to="/" className="active" ><i className="fa fa-desktop"></i>
                            <span>首页</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/myarticle/posted"><i className="fa fa-file-text-o"></i><span>我的稿件</span></Link>
                    </li>
                    <li>
                        <a className="up" onClick={this.click} href="javascript:;"><i className="fa fa-file-text-o"> </i><span>新闻管理</span></a>
                        <ul ref={'editUl'} className="newsEdit clearFix">
                            <Link to="/column/headline">新闻列表</Link>
                            <Link to="/edit">新建稿件</Link>
                        </ul>
                    </li>
                    <li>
                        <Link to="pic"><i className="fa fa-file-text-o"> </i><span>图片管理</span></Link>
                    </li>
                    <li><a href="javascript:;"><i className="fa fa-pencil-square-o"></i><span>专栏作家</span></a></li>
                    <li>
                        <a className="ad" href="javascript:;"><i className="fa fa-puzzle-piece"></i><span>广告管理</span></a>
                        <ul className="adEdit">
                            <a href="javascript:;">广告位管理</a>
                            <a href="javascript:;">广告管理</a>
                        </ul>
                    </li>
                    <li>
                        <Link to="/readCount">
                            <i className="fa fa-line-chart"></i>
                            <span>阅读统计</span>
                        </Link>
                    </li>
                    <li><Link to="/usermanagement"><i className="fa fa-users"></i><span>员工统计</span></Link></li>
                    <li><Link to="/usermanagement"><i className="fa fa-tags"></i><span>用户管理</span></Link></li>
                </ul>
            </div>
        )
    }
}
export default SideBar;