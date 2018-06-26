import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import './news.css';
import Tr from './newsTr';
import Page from '../Page/page';

class News extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //当前栏目
            path:'',
            //总页数
            count:0,
            //当前页
            currentPage:1,
            //新添加
            id:'',
            //弹框数据
            tanObj:{
                title:'', 
                picSrc:'',
                main:'',
                column:'',
                path:'',
                editor:'',
                approve:'',
                isTop:true,
                status:''
            }
         };
    }

    //初始化
    componentDidMount (){
        //获取新闻
        let {getNewsData} = this.props;
        getNewsData('all',1);  //走中间件，栏目+页码'
        
        //获取页码
        let {getCount} = this.props;
        getCount('all');  //走中间件
    }

    //添加新闻
    add = ()=>{
        this.refs.tan.style.display = 'block';
        this.setState({tanObj:{
            title:'', 
            picSrc:'',
            main:'',
            column:'',
            path:'',
            editor:'',
            approve:'',
            isTop:true,
            status:''
        },id:''})
    }
    
    //修改新闻
    show = (e)=>{
        this.setState({tanObj:e,id:e.id});
        this.refs.tan.style.display = 'block';
    }

    submit = ()=>{
        let {tanObj,id} = this.state;
        if(!id){
            //添加新闻
            let {actions:{addnews}} = this.props;
            addnews(tanObj);  //往中间件中发送数据
        }else{
            //修改新闻
            let {actions:{editNewsData}} = this.props;
            editNewsData(id,tanObj);  //往中间件中发送数据
        }
    }

    //删除新闻
    del = (id)=>{
        let {actions:{delNewsData}} = this.props;
        let {currentPage} = this.state;
        delNewsData(id,currentPage);  //往中间件中发送数据
        console.log(currentPage);
    }

    //关闭弹窗
    closeTan = ()=>{
        this.refs.tan.style.display = 'none';
    }

    //修改弹窗内容
    changeTitle = (ev)=>{
        let {tanObj} = this.state;
        tanObj.title = ev.target.value;
        this.setState({tanObj});
    }
    changePicSrc = (ev)=>{
        let {tanObj} = this.state;
        tanObj.picSrc = ev.target.value;
        this.setState({tanObj});
    }
    changeMain = (ev)=>{
        let {tanObj} = this.state;
        tanObj.main = ev.target.value;
        this.setState({tanObj});
    }
    changeColumn = (ev)=>{
        let {tanObj} = this.state;
        tanObj.column = ev.target.value;
        this.setState({tanObj});
    }
    changePath = (ev)=>{
        let {tanObj} = this.state;
        tanObj.path = ev.target.value;
        this.setState({tanObj});
    }
    changeEditor = (ev)=>{
        let {tanObj} = this.state;
        tanObj.editor = ev.target.value;
        this.setState({tanObj});
    }
    changeApprove = (ev)=>{
        let {tanObj} = this.state;
        tanObj.approve = ev.target.value;
        this.setState({tanObj});
    }
    changeTop = (ev)=>{
        let {tanObj} = this.state;
        tanObj.top = ev.target.checked;
        this.setState({tanObj});
    }
    
    render(){
        //根据组件内的新闻数据渲染页面
        let {dataNews} = this.props;
        console.log(dataNews);
        let newArr = [].map((e,i)=>{
            let obj={
                key:i,
                e,
                i,
                show:this.show,
                del:this.del
            }
            return <Tr {...obj}/>;
        })

        //页码
        
        //渲染所有栏目生成二级菜单
        let {dataColumn} = this.props;
        let columnArr = dataColumn.map((e,i)=>{
            let path = '/index/news/'+e.path;
            return (
                <li key={i}><NavLink to={path} activeClassName="active">{e.column}</NavLink></li>
            )
        })

        //渲染弹框
        let {tanObj} = this.state;
        //控制弹框是否出现
        let {isTanShow} = this.props;
        let sty = isTanShow?'tan_content block':'tan_content none';
        
        return (
            <div className="content1">
                <div className="table_top">
                    <div className="big">搜索查询</div>
                    <div className="tab_search">
                        <span>新闻标题</span>
                        <input type="text" placeholder="请输入"/>
                        <button>查询</button>
                        <span>日期</span>
                        <input type="text" placeholder="请输入"/>
                        <button>查询</button>
                    </div>
                    <ul className="tab_nav">
                        <li key='-1'><NavLink to="/index/news" activeClassName="active">所有新闻</NavLink></li>
                        {columnArr}
                    </ul>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        <button 
                            onClick={this.add}
                        ><i className="fa fa-plus"></i>添加
                        </button>
                        <button><i className="fa fa-pencil"></i>修改</button>
                        <button className="red"><i className="fa fa-trash"></i>批量删除</button>
                        <button><i className="fa fa-trash"></i>按日期排序</button>
                        <button><i className="fa fa-trash"></i>按阅读量排序</button>
                    </div>
                    <table className="newsTable">
                        <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>ID</th>
                            <th>标题</th>
                            <th>栏目</th>
                            <th>阅读量</th>
                            <th>评论量</th>
                            <th>转发量</th>
                            <th>编辑</th>
                            <th>主编</th>
                            <th>状态</th>
                            <th>时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            {newArr}
                        </tbody>
                    </table>
                    <Page len={30} />
                </div>

                {/* 弹框 */}
                <div 
                    className={sty}
                    ref="tan"
                >
                    <div className="bg"></div>
                    <div className="tan_box">
                        <div className="tan_title clear">
                            <span>修改</span>
                            <i
                                onClick={this.closeTan}
                            >×</i>
                        </div> 
                        <div className="input_content">
                            <div className="input_info">
                                <span>新闻标题：</span>
                                <input
                                    type="text" 
                                    value={tanObj.title}
                                    onChange={this.changeTitle}
                                />
                            </div>
                            <div className="input_info">
                                <span>图片路径：</span>
                                <input 
                                    type="text" 
                                    value={tanObj.picSrc}
                                    onChange={this.changePicSrc}
                                />
                            </div>
                            <div className="input_info">
                                <span>栏&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目：</span>
                                <input 
                                    type="text"
                                    value={tanObj.column}
                                    onChange={this.changeColumn}
                                />
                            </div>
                            <div className="input_info">
                                <span>栏目路径：</span>
                                <input 
                                    type="text"
                                    value={tanObj.path}
                                    onChange={this.changePath}
                                />
                            </div>
                            <div className="input_info">
                                <span>编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;辑：</span>
                                <input 
                                    type="text"
                                    value={tanObj.editor}
                                    onChange={this.changeEditor}
                                />
                            </div>
                            <div className="input_info">
                                <span>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编：</span>
                                <input 
                                    type="text"
                                    value={tanObj.approve}
                                    onChange={this.changeApprove}
                                />
                            </div>
                            <div className="input_info">
                                <span>头条大图：</span>
                                <input 
                                    type="radio" 
                                    name="radio" 
                                    checked={tanObj.isTop?true:false}
                                    onChange={this.changeTop}
                                    className="radio_btn" />
                                <span>是</span>
                                <input 
                                    type="radio" 
                                    name="radio" 
                                    checked={tanObj.isTop?false:true}
                                    onChange={this.changeTop}
                                    className="radio_btn" 
                                />
                                <span>否</span>
                            </div>
                            <div className="input_info">
                                <span>内&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容：</span>
                                <textarea
                                    value={tanObj.main}
                                    onChange={this.changeMain}
                                >
                                </textarea>
                            </div>
                            <div className="btn_sure">
                                <button 
                                    href="javascript:;"
                                    className="sure"
                                    onClick={this.submit}
                                >提交</button>
                                <button 
                                    className="cancel"
                                    onClick={this.closeTan}
                                >取消</button>
                            </div>
                            <span ref="tip" style={{'display':'none'}}>提交成功</span>
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}

// export default connect((state,ownProps)=>{
//     return {
//         dataNews:state.reducernews,
//         dataColumn:state.reducercolumn,
//         url:ownProps.url
//     };
// },dispatch=>bindActionCreators(actionCreators,dispatch))(News);

export default connect((state,ownProps)=>{
    return {
        dataNews:state.reducernews,
        dataColumn:state.reducercolumn,
        url:ownProps.url
    };
},dispatch=>bindActionCreators(actionCreators,dispatch))(News);