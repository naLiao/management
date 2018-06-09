import React from 'react';
import {Link} from 'react-router-dom';
import './sidebar.css';

class SideBar extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        return (
            <div id="sideBar">
                <ul class="nav">
                    <li>
                        <Link to="/" class="active" href="#"><i className="fa fa-desktop"></i>
                            <span>首页</span>
                        </Link>
                    </li>
                    <li>
                        <a class="up" href="javascript:;"><i className="fa fa-file-text-o"> </i><span>新闻上传</span></a>
                        <ul class="newsEdit clearFix">
                            <a href="newsEdit.html">栏目</a>
                            <a href="javascript:;">内容</a>
                            <a href="javascript:;">我的稿件</a>
                        </ul>
                    </li>
                    <li>
                        <Link to="/readCount" href="readCount.html">
                            <i className="fa fa-line-chart"></i>
                            <span>阅读统计</span>
                        </Link>
                    </li>
                    <li><a href="javascript:;"><i className="fa fa-users"></i><span>员工统计</span></a></li>
                    <li><a href="javascript:;"><i className="fa fa-tags"></i><span>用户管理</span></a></li>
                    <li><a href="javascript:;"><i className="fa fa-pencil-square-o"></i><span>专栏作家</span></a></li>
                    <li>
                        <a class="ad" href="javascript:;"><i className="fa fa-puzzle-piece"></i><span>广告管理</span></a>
                        <ul class="adEdit">
                            <a href="javascript:;">广告位管理</a>
                            <a href="javascript:;">广告管理</a>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}
export default SideBar;