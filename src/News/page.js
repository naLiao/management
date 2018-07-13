import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentPage:this.props.currentPage
         };
    }

    jumpToPrev = ()=>{
        let {history} = this.props;
        let {currentPage} = this.state;

        currentPage--;
        history.push('/index/news/page'+currentPage);

        this.pageInTr(currentPage);
    }

    jumpToNext = ()=>{
        let {history} = this.props;
        let {currentPage} = this.state;

        currentPage++;
        history.push('/index/news/page'+currentPage);

        this.pageInTr(currentPage);
    }

    jumpToFirst = ()=>{
        let {history} = this.props;
        let {currentPage} = this.state;

        currentPage = 1;
        
        history.push('/index/news/page'+currentPage);

        this.pageInTr(currentPage);
    }

    jumpToLast = ()=>{
        let {len,history} = this.props;
        let {currentPage} = this.state;

        currentPage = len;
        history.push('/index/news/page'+currentPage);

        this.pageInTr(currentPage);
    }

    //跳转到多少页
    jumpTo = (ev)=>{
        if(ev.keyCode===13){
            let {len,history} = this.props;
            let {currentPage} = this.state;

            currentPage = ev.target.value*1;
            if(currentPage>len){
                currentPage = len;
            }
            history.push('/index/news/page'+currentPage);
            ev.target.value = '';

            this.pageInTr(currentPage);
        }
    }

    pageInTr = (i)=>{
        let {page,searchNewsData,searchName,searchColumn,getNewsData} = this.props;
        console.log(searchName,searchColumn);
        
        this.setState({currentPage:i})
        if(!searchName&&!searchColumn){
            getNewsData(i);
        }else{
            searchNewsData(i,searchName,searchColumn);
        }
        page(i);
    }

    render() {
        let {len,currentPage} = this.props;
        let prevClass = currentPage===1 ? 'prev unclick' : 'prev';
        let nextClass = currentPage===len ? 'next unclick' : 'next';
        let arr = [];
        // console.log(currentPage);
        
        //生成页码条
        for(let i=1;i<=len;i++){
            arr.push(
                <li 
                className={currentPage===i?'active':''}
                key={i}>
                    <Link
                        to={`page${i}`}
                        onClick={this.pageInTr.bind(this,i)}
                    >{i}</Link>
                </li>
            );
        }
        
        return (
            <div className="pageBox">
                <ul id="pages">
                    <li><a 
                        className={prevClass} 
                        onClick={this.jumpToFirst}
                    >&lsaquo;&lsaquo;</a></li>
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
                    <li><a 
                        className={nextClass} 
                        href="javascript:;"
                        onClick={this.jumpToLast}
                    >&rsaquo;&rsaquo;</a></li>
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

export default connect((state,ownProps)=>{
    return {
        dataNews:state.reducernews,
    };
},dispatch=>bindActionCreators(actionCreators,dispatch))(withRouter(Page));