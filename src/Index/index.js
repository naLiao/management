import React from 'react';
import './index.css';

class IndexContent extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        return (
            <div id="index">
                <div className="fourUl">
                    <ul className="col">
                        <li className="bg_purple">
                            <div className="icon">
                                <i className="fa fa-align-left"></i>
                            </div>
                            <span className="smallText">今日访客量</span>
                            <span className="bigText">5,356</span>
                        </li>
                    </ul>
                    <ul className="col">
                        <li className="bg_blue">
                            <div className="icon">
                                <i className="fa fa-calendar"></i>
                            </div>
                            <span className="smallText">本月访客量</span>
                            <span className="bigText">3,245,356</span>
                        </li>
                    </ul>
                    <ul className="col">
                        <li className="bg_green">
                            <div className="icon">
                                <i className="fa fa-user-plus"></i>
                            </div>
                            <span className="smallText">注册用户数</span>
                            <span className="bigText">3,245,356</span>
                        </li>
                    </ul>
                    <ul className="col">
                        <li className="bg_red">
                            <div className="icon">
                                <i className="fa fa-clock-o"></i>
                            </div>
                            <span className="smallText">平均在线时长</span>
                            <span className="bigText">13.25</span>
                        </li>
                    </ul>
                </div>
                <div id="table"></div>
            </div>
        )
    }
}
export default IndexContent;