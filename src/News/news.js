import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import './news.css';
import Tr from './newsTr';
import Page from '../Page/page';
import Tip from '../Tip/tip';
import cookie from 'react-cookies'

class News extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //当前登录用户
            name:'',
            level:'',
            //提示框是否显示
            isTipShow:false,
            tipInfo:'',
            //当前栏目
            path:'all',
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

    componentWillMount(){
        let {tanObj} = this.state;
        tanObj.editor = cookie.load('user');
        this.setState({name: cookie.load('user'),level:Number(cookie.load('level')),tanObj});
    }

    //初始化
    componentDidMount (){
        let {getColumnData,getNewsData,getCount} = this.props;
        console.log('初始化');
        //获取栏目
        getColumnData(1);  //走中间件，页码
        //获取新闻
        getNewsData('all',1);  //走中间件，栏目+页码
        //获取页码
        getCount('all');  //走中间件
    }

    componentWillReceiveProps({url:{match:{params}}}){
        let id1 = params.id;
        let column = params.column;
        //切换页码
        let {url:{match:{params:{id}}},getNewsData} = this.props;
        let {path} = this.state;
        let currentPage = id1.split('page')[1]*1;
        this.setState({currentPage});
        if(id1 !== id){
            console.log('页码切换，要请求数据了'+ currentPage);
            getNewsData(path,currentPage);  //走中间件，栏目+页码
        }
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

    submit = async ()=>{
        let {tanObj,id,path,currentPage} = this.state;
        //修改新闻
        let {editNewsData} = this.props;
        editNewsData(id,tanObj,'审核中');  //往中间件中发送数据
        this.refs.tan.style.display = 'none';
        this.tipShow('修改成功');
    }

    //保存稿件
    draft = async()=>{
        let {getMyData,editNewsData,getMyCount,addnews,url:{match:{params:{kind}}}} = this.props;
        let {tanObj,id,name,currentPage} = this.state;
        await editNewsData(id,tanObj,'编辑中');
        this.refs.tan.style.display = 'none';
        await this.tipShow('保存成功');
    }
    
    //删除新闻，删除完成后重新渲染数据、页码
    del = async (id)=>{
        let {getNewsData,dataNews,getCount,delNewsData,history} = this.props;
        let {path,currentPage} = this.state;

        if(dataNews.news.length===1){
            currentPage--;
            history.push('/index/news/page'+ currentPage);
        }
        await delNewsData(id,currentPage);  //往中间件中发送数据
        await getNewsData(path,currentPage);
        await getCount(path);
        this.tipShow('删除成功');
    }

    //栏目筛选
    select = (ev)=>{
        let {getNewsData,getCount} = this.props;
        let {currentPage} = this.state;
        let column = ev.target.value;
        getNewsData(column,currentPage);
        getCount(column);  
    }

    //提示框弹出
    tipShow = (info)=>{
        this.setState({isTipShow:true,tipInfo:info});
        let that = this;
        setTimeout(function(){
            that.setState({isTipShow:false,tipInfo:''});
        },1000)
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
        let index = ev.target.selectedIndex;
        let column = ev.target.options[index].innerHTML;
        tanObj.path = ev.target.value;
        tanObj.column = column;
        // console.log(tanObj);
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
        let {getNewsData,dataColumn,dataNews,url:{match:{params:{id}}},url:{history:{push}}} = this.props;  //栏目数据 新闻数据
        let {isTipShow,path,tanObj,tipInfo,name,level} = this.state;
        let count = dataNews.count;  //页码
        let currentPage = id.split('page')[1]*1;  //当前页
        // console.log(dataNews.news);
        
        //根据组件内的新闻数据渲染页面
        let newArr = dataNews.news.map((e,i)=>{
            let obj={
                key:i,
                e,
                i,
                show:this.show,
                del:this.del
            }
            return <Tr {...obj}/>;
        })
        
        //渲染栏目选取框
        let selectColumn = dataColumn.columns.map((e,i)=>{
            return (
                <option key={i} value={e.path} >{e.column}</option>
            )
        })

        return (
            <div className="content1">
                <Tip isTipShow={isTipShow} tipInfo={tipInfo}/>
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
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        {/* <button 
                            onClick={this.add}
                        ><i className="fa fa-plus"></i>添加
                        </button> */}
                        <button className="red"><i className="fa fa-trash"></i>批量删除</button>
                        {/* <button><i className="fa fa-trash"></i>按日期排序</button>
                        <button><i className="fa fa-trash"></i>按阅读量排序</button> */}
                        <select
                            className="colSel"
                            onChange={this.select}
                        >
                            <option disabled>请选择</option>
                            <option value='all'>所有新闻</option>
                            {selectColumn}
                        </select>
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
                    <Page len={count} path="/index/news" currentPage={currentPage} push={push} />
                </div>

                {/* 弹框 */}
                <div className="tan_content" ref="tan" >
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
                                <select
                                    onChange={this.changeColumn}
                                >
                                    <option disabled>请选择</option>
                                    <option value='all'>所有新闻</option>
                                    {selectColumn}
                                </select>
                            </div>
                            {/* <div className="input_info">
                                <span>栏目路径：</span>
                                <input 
                                    type="text"
                                    value={tanObj.path}
                                    onChange={this.changePath}
                                />
                            </div> */}
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
                                    href="javascript:;"
                                    className="sure"
                                    onClick={this.draft}
                                >保存</button>
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

export default connect((state,ownProps)=>{
    return {
        dataNews:state.reducernews,
        dataColumn:state.reducercolumn,
        url:ownProps.url
    };
},dispatch=>bindActionCreators(actionCreators,dispatch))(News);