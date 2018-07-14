import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import './index.css';
import Tr from './indexTr';
import EchartsTest from './echarts';

class IndexContent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            totalReadNum:0,
            dataTop10:[]
         };
    }

    //初始化
    componentDidMount (){
        let {getCount,getColCount,getAccountCount} = this.props;
        getCount('','');
        getColCount('');
        getAccountCount('','');

        fetch(`http://127.0.0.1:88/api/news/top10`)
        .then(e=>e.json())
        .then(dataTop10=>{
            this.setState({dataTop10});
        })

        
        fetch(`http://127.0.0.1:88/api/news/totalReadNum`)
        .then(e=>e.json())
        .then(totalReadNum=>{
            this.setState({totalReadNum});
        })
    }

    render(){
        let {dataNews} = this.props;
        let {dataAccount} = this.props;
        let {dataColumn} = this.props;
        let {totalReadNum,dataTop10} = this.state;

        let newArr = dataTop10.map((e,i)=>{
            let obj={
                key:i,
                i,
                e
            }
            return <Tr {...obj}/>;
        })
        
        return (
            <div>
                <div id="index" className="content">
                    <div className="fourUl">
                        <ul className="col">
                            <li className="bg_purple">
                                <div className="icon">
                                    <i className="fa fa-align-left"></i>
                                </div>
                                <span className="smallText">总阅读量</span>
                                <span className="bigText">{totalReadNum}</span>
                            </li>
                        </ul>
                        <ul className="col">
                            <li className="bg_blue">
                                <div className="icon">
                                    <i className="fa fa-calendar"></i>
                                </div>
                                <span className="smallText">已发布新闻</span>
                                <span className="bigText">{dataNews.total}</span>
                            </li>
                        </ul>
                        <ul className="col">
                            <li className="bg_green">
                                <div className="icon">
                                    <i className="fa fa-user-plus"></i>
                                </div>
                                <span className="smallText">总员工数量</span>
                                <span className="bigText">{dataAccount.total}</span>
                            </li>
                        </ul>
                        <ul className="col">
                            <li className="bg_red">
                                <div className="icon">
                                    <i className="fa fa-clock-o"></i>
                                </div>
                                <span className="smallText">总栏目数量</span>
                                <span className="bigText">{dataColumn.total}</span>
                            </li>
                        </ul>
                    </div>
                    <h2 className="title_index">阅读量Top5</h2>
                    <table className="newsTable">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>标题</th>
                            <th>栏目</th>
                            <th>阅读量</th>
                            <th>编辑</th>
                            <th>主编</th>
                            <th>时间</th>
                        </tr>
                        </thead>
                        <tbody>
                            {newArr}
                        </tbody>
                    </table>
                    <EchartsTest />
                </div>
            </div>
        )
    }
}
export default connect((state,ownProps)=>{
    return {
        dataNews:state.reducernews,
        dataAccount:state.reduceraccount,
        dataColumn:state.reducercolumn
    };
},dispatch=>bindActionCreators(actionCreators,dispatch))(withRouter(IndexContent));