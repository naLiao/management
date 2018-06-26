import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './page.css';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count:6
         };
    }
    render() {
        let {len} = this.props;
        let {count} = this.state;
        //计算总共多少页
        let n = Math.ceil(len/count);
        let arr = [];
        //生成页码条
        for(let i=0;i<n;i++){
            arr.push(<li key={i}><NavLink to="/" activeclassname="active">{i+1}</NavLink></li>);
        }
        
        return (
            <div className="pageBox">
                <ul id="pages">
                    <li><a className="prev" href="javascript:;">&lsaquo;</a></li>
                    {arr}
                    <li><a className="next" href="javascript:;">&rsaquo;</a></li>
                    <li className="jumpTo">
                        <span>跳转到</span>
                        <input type="text"/>
                        <span>页</span>
                    </li>
                    <li><span className="total">共{len}页</span></li>
                </ul>
            </div>
        );
    }
}

export default Page;