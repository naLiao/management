import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './page.css';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    jumpToPrev = ()=>{
        let {path,currentPage,push} = this.props;
        currentPage--;
        push(path+'/page'+currentPage);
    }

    jumpToNext = ()=>{
        let {path,currentPage,push} = this.props;
        currentPage++;
        push(path+'/page'+ currentPage);
    }

    //跳转到多少页
    jumpTo = (ev)=>{
        if(ev.keyCode===13){
            let {len,path,push} = this.props;
            let pageTo = ev.target.value*1;
            if(pageTo>len){
                pageTo = len;
                ev.target.value = len;
            }
            push(path+'/page'+ pageTo);
        }
    }

    render() {
        //count:总共多少页
        let {len,path,currentPage} = this.props;
        let prevClass = currentPage===1 ? 'prev unclick' : 'prev';
        let nextClass = currentPage===len ? 'next unclick' : 'next';
        let arr = [];
        //生成页码条
        for(let i=0;i<len;i++){
            arr.push(
                <li key={i}>
                    <NavLink
                        to={path+`/page${i+1}`} 
                        activeclassname="active"
                    >{i+1}</NavLink>
                </li>
            );
        }
        
        return (
            <div className="pageBox">
                <ul id="pages">
                    <li><a 
                        className={prevClass} 
                        href="javascript:;"
                        onClick={this.jumpToPrev}
                    >&lsaquo;</a></li>
                    {arr}
                    <li><a 
                        className={nextClass} 
                        href="javascript:;"
                        onClick={this.jumpToNext}
                    >&rsaquo;</a></li>
                    <li className="jumpTo">
                        <span>跳转到</span>
                        <input 
                            type="text"
                            placeholder="1"
                            onKeyUp={this.jumpTo}
                        />
                        <span>页</span>
                    </li>
                    <li><span className="total">共{len}页</span></li>
                </ul>
            </div>
        );
    }
}

export default Page;