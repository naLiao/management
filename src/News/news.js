import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import './news.css';
import Tr from './newsTr';
import Page from './page';
import Tip from '../Tip/tip';
import cookie from 'react-cookies'

class News extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //按名称查询
            searchName:'',
            searchColumn:'',
            //是否全选
            isCheckAll:false,
            //当前登录用户
            name:'',
            level:'',
            //提示框是否显示
            isTipShow:false,
            tipInfo:'',
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
        tanObj.editor = cookie.load('user');  //默认编辑为已登录用户
        this.setState({name: cookie.load('user'),level:Number(cookie.load('level')),tanObj});
    }

    //初始化
    componentDidMount (){
        let {getColumnData,getNewsData,getCount} = this.props;
        let {searchColumn,searchName} = this.state;
        console.log('初始化');
        getColumnData(1);
        //获取新闻
        getNewsData(1);  //走中间件，栏目+页码
        //获取页码
        getCount(searchName,searchColumn);  //走中间件
    }

    //修改查询名称
    changeSearchName = (ev)=>{
        this.setState({searchName:ev.target.value})
    }

    //修改查询栏目
    changesearchColumn = (ev)=>{
        this.setState({searchColumn:ev.target.value})
    }

    //查询
    search = ()=>{
        let {getNewsData,searchNewsData,getCount,url:{history}} = this.props;
        let {searchName,searchColumn,currentPage} = this.state;
        
        //获取账户
        if(!searchName&&!searchColumn){
            getNewsData(1);
            getCount(searchName,searchColumn);
        }else{
            console.log('走这里');
            
            searchNewsData(1,searchName,searchColumn); 
            getCount(searchName,searchColumn);
        }
        history.push('page1');
        this.setState({currentPage:1});
    }

    //接收组件是否全选
    cc = (isTrue)=>{
        this.setState({isCheckAll:isTrue});
    }

    //点击全部勾选
    checkAll = (ev)=>{
        let {dataNews} = this.props;
        let {isCheckAll} = this.state;

        isCheckAll = !isCheckAll;

        dataNews.news.forEach(e=>{
            e.checked = isCheckAll;
        })

        this.setState({isCheckAll});
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
        let {tanObj,id,currentPage} = this.state;
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
    
    //删除一个
    del = (id)=>{
        let {getNewsData,dataNews,getCount,delNewsData, url:{history}} = this.props;
        let {currentPage,searchName,searchColumn} = this.state;
        let ids = JSON.stringify([id]);
        delNewsData(ids);  //往中间件中发送数据
        let that = this;
        setTimeout(function(){
            if(dataNews.news.length===1 &&currentPage>1){
                currentPage--;
                that.setState({currentPage});
                history.push('/index/news/page'+ currentPage);
                getCount(searchName,searchColumn);
            }else{
                getNewsData(currentPage);
                getCount(searchName,searchColumn);
            }
            that.tipShow('删除成功');
        },50);
    }

    //点击批量删除
    delMulti = ()=>{
        let {dataNews,getNewsData,getCount,delNewsData,url:{history}} = this.props;
        let {currentPage,isCheckAll,idArray,level,searchName,searchColumn} = this.state;

        let arr = [];
        dataNews.news.forEach(e=>{
            if(e.checked){
                arr.push(e.id);
            }
        })
        console.log(arr);
        let ids = JSON.stringify(arr);
        delNewsData(ids);  //往中间件中发送数据
        let that = this;
        setTimeout(function(){
            if(isCheckAll&&currentPage>1){
                currentPage--;
                that.setState({currentPage});
            }
            console.log(currentPage);
            history.push('/index/news/page'+ currentPage);
            getNewsData(currentPage);
            getCount(searchName,searchColumn);
            that.tipShow('删除成功');
            that.setState({isCheckAll:false});
        },50)
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

    //接收子组件页码
    page = (currentPage)=>{
        this.setState({currentPage,isCheckAll:false});
    }
    
    render(){
        let {getNewsData,dataColumn,dataNews,url:{match:{params:{id}}},url:{history:{push}}} = this.props;  //栏目数据 新闻数据
        let {isTipShow,tanObj,tipInfo,searchName,searchColumn,name,level,isCheckAll} = this.state;
        let count = dataNews.count;  //页码
        let currentPage = id.split('page')[1]*1;  //当前页
        // console.log(dataNews);
        
        //根据组件内的新闻数据渲染页面
        let newArr = dataNews.news.map((e,i)=>{
            let obj={
                key:i,
                i,
                e,
                isCheckAll,
                show:this.show,
                del:this.del,
                tipShow:this.tipShow,
                cc:this.cc
            }
            return <Tr {...obj}/>;
        })
        
        // 渲染栏目选取框
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
                        <input 
                            type="text" 
                            placeholder="请输入"
                            value={searchName}
                            onChange={this.changeSearchName}
                        />
                        <span>所属栏目</span>
                        <input 
                            type="text" 
                            placeholder="请输入"
                            value={searchColumn}
                            onChange={this.changesearchColumn}
                        />
                        <button
                            onClick={this.search}
                        >查询</button>
                    </div>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        {/* <button 
                            onClick={this.add}
                        ><i className="fa fa-plus"></i>添加
                        </button> */}
                        <button 
                            className="red"
                            onClick={this.delMulti}
                        ><i className="fa fa-trash"></i>批量删除</button>
                        {/* <button><i className="fa fa-trash"></i>按日期排序</button>
                        <button><i className="fa fa-trash"></i>按阅读量排序</button> */}
                        {/* <select
                            className="colSel"
                            onChange={this.select}
                        >
                            <option disabled>请选择</option>
                            <option value='all'>所有新闻</option>
                            {selectColumn}
                        </select> */}
                    </div>
                    <table className="newsTable">
                        <thead>
                        <tr>
                            <th><input 
                                type="checkbox"
                                checked={isCheckAll?'checked':''}
                                onChange={this.checkAll}
                            /></th>
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
                    <Page 
                        len={count} 
                        currentPage={currentPage} 
                        page={this.page}
                        searchName={searchName}
                        searchColumn={searchColumn}
                    />
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