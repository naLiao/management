import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './myarticle.css';
import Tr from './myarticleTr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import cookie from 'react-cookies'
import Tip from '../Tip/tip';
import Page from './page';

class MyArticle extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            //当前路径
            kind:'my',
            //按名称查询
            searchName:'',
            searchColumn:'',
            //是否全选
            isCheckAll:false,
            //当前登录用户
            name:'',
            level:'',
            //是否全部勾选
            isCheckAll:false,
            //提示框是否显示
            isTipShow:false,
            tipInfo:'',
            //当前页
            currentPage:1,
            //新添加
            id:'',
            idArray:[],
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

    componentDidMount(){ 
        let {getMyData,getMyCount,getColumnData,getApproveData,getAppCount} = this.props;
        let {tanObj,searchName,searchColumn} = this.state;

        //获取当前登录用户名和级别
        let name = cookie.load('user');
        let level = Number(cookie.load('level'));
        this.setState({name,level});
        
        //判断级别获取已审核数据
        if(level<=2){
            getApproveData(1,name);
            getAppCount(name,searchName,searchColumn);
        }
        getColumnData(1);
        getMyData(1,name);
        getMyCount(name,searchName,searchColumn);
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
        let {getMyData,searchMyData,getApproveData,searchApproveData,getMyCount,getAppCount,url:{history}} = this.props;
        let {name,kind,searchName,searchColumn,currentPage} = this.state;
        
        if(kind==='my'){
            if(!searchName&&!searchColumn){
                getMyData(1,name);
                getMyCount(name,searchName,searchColumn);
            }else{
                searchMyData(1,name,searchName,searchColumn); 
                getMyCount(name,searchName,searchColumn);
            }
        }
        if(kind==='approve'){
            if(!searchName&&!searchColumn){
                getApproveData(1,name);
                getAppCount(name,searchName,searchColumn);
            }else{
                searchApproveData(1,name,searchName,searchColumn); 
                getAppCount(name,searchName,searchColumn);
            }
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
        let {dataMy,dataApprove} = this.props;
        let {kind,isCheckAll} = this.state;

        isCheckAll = !isCheckAll;
        
        if(kind==='my'){
            dataMy.news.forEach(e=>{
                e.checked = isCheckAll;
            })
        }
        if(kind==='approve'){
            dataApprove.news.forEach(e=>{
                e.checked = isCheckAll;
            })
        }

        this.setState({isCheckAll});
    }

    approveFn = (e)=>{
        this.setState({tanObj:e,id:e.id});
        this.refs.tan.style.display = 'block';
    }

    //发布稿件
    pass = async()=>{
        let {approveArticle,getApproveData,getAppCount,url:{history:{location}}} = this.props;
        let {name,searchName,searchColumn,currentPage} = this.state;
        let {id} = this.state;
        await approveArticle(id);
        this.refs.tan.style.display = 'none';
        this.tipShow('发布成功');
        await getApproveData(name,currentPage);
        await getAppCount(name,searchName,searchColumn);
    }

    //退回稿件
    back = async()=>{
        let {approveArticle,getApproveData,editNewsData,getAppCount,url:{history:{location}}} = this.props;
        let {name,searchName,searchColumn,currentPage} = this.state;
        let {tanObj,id} = this.state;
        console.log(tanObj);
        
        await editNewsData(id,tanObj,'已退回');
        this.refs.tan.style.display = 'none';
        this.tipShow('退回成功');
        await getApproveData(name,currentPage);
        await getAppCount(name,searchName,searchColumn);
    }

    //添加新闻
    add = ()=>{
        this.refs.tan2.style.display = 'block';
        let {name,tanObj} = this.state;
        tanObj.title = '';
        tanObj.picSrc = '';
        tanObj.main = '';
        tanObj.column = '';
        tanObj.path = '';
        tanObj.editor = name;
        tanObj.approve = '';
        tanObj.isTop = true;
        tanObj.status = '';
        this.setState({tanObj,id:''})
    }

    //修改新闻
    show = (e)=>{
        console.log(e);
        this.setState({tanObj:e,id:e.id});
        let {tanObj} = this.state;
        console.log(tanObj);
        
        this.refs.tan2.style.display = 'block';
    }

    //点击提交按钮
    submit = async ()=>{
        let {getMyData,getApproveData,editNewsData,getMyCount,getAppCount,addnews} = this.props;
        let {tanObj,id,kind,name,searchName,searchColumn,currentPage} = this.state;
        
        switch(kind){
            case 'my':
                if(!id){
                    //添加新闻
                    console.log(123);
                    
                    await addnews(tanObj,'审核中');  
                    this.refs.tan2.style.display = 'none';
                    await this.tipShow('添加成功');
                    await getMyData(currentPage,name);
                    await getMyCount(name,searchName,searchColumn);
                }else{
                    //修改新闻
                    await editNewsData(id,tanObj,'审核中');  
                    this.refs.tan2.style.display = 'none';
                    this.tipShow('修改成功');
                    await getMyData(currentPage,name);
                    await getMyCount(name,searchName,searchColumn);
                }
                break;
            case 'approve':
                await editNewsData(id,tanObj,'审核中');  
                await getApproveData(currentPage,name);
                await getAppCount(name,searchName,searchColumn);
                this.refs.tan2.style.display = 'none';
                this.tipShow('修改成功');
                break;
            default:
                return;
        }
    }

    //保存稿件
    draft = async()=>{
        let {getMyData,editNewsData,getMyCount,getApproveData,getAppCount,addnews} = this.props;
        let {tanObj,id,name,kind,searchName,searchColumn,currentPage} = this.state;

        switch(kind){
            case 'my':
                if(!id){
                    await addnews(tanObj,'编辑中');  
                    await getMyData(currentPage,name);
                    await getMyCount(name,searchName,searchColumn);
                    this.refs.tan2.style.display = 'none';
                    await this.tipShow('保存成功');
                }else{
                    await editNewsData(id,tanObj,'编辑中');
                    await getMyData(currentPage,name);
                    await getMyCount(name,searchName,searchColumn);
                    this.refs.tan2.style.display = 'none';
                    await this.tipShow('保存成功');
                }
                break;
            case 'approve':
                await editNewsData(id,tanObj,'编辑中');
                await getApproveData(currentPage,name);
                await getAppCount(name,searchName,searchColumn);
                this.refs.tan2.style.display = 'none';
                await this.tipShow('保存成功');
                break;
            default:
                return;
        }
    }

    //删除一个
    del = (id)=>{
        let {getMyData,getApproveData,dataMy,dataApprove,getMyCount,getAppCount,delNewsData,url:{history}} = this.props;
        let {currentPage,kind,name,searchName,searchColumn} = this.state;
        let ids = JSON.stringify([id]);
        delNewsData(ids);  //往中间件中发送数据
        let that = this;
        setTimeout(function(){
            if(kind==='my'){
                if(dataMy.news.length===1 &&currentPage>1){
                    currentPage--;
                    that.setState({currentPage});
                    history.push('/index/myarticle/page'+ currentPage);
                    getMyCount(name,searchName,searchColumn);
                }else{
                    getMyData(currentPage,name,searchName,searchColumn);
                    getMyCount(name,searchName,searchColumn);
                }
            }
            if(kind==='approve'){
                if(dataApprove.news.length===1 &&currentPage>1){
                    currentPage--;
                    that.setState({currentPage});
                    history.push('/index/myarticle/page'+ currentPage);
                    getAppCount(name,searchName,searchColumn);
                }else{
                    getApproveData(currentPage,name);
                    getAppCount(name,searchName,searchColumn);
                }
            }
            
            that.tipShow('删除成功');
        },50);
    }

    //点击批量删除
    delMulti = ()=>{
        let {dataMy,getMyData,getMyCount,getApproveData,dataApprove,getAppCount,delNewsData,url:{history}} = this.props;
        let {currentPage,kind,isCheckAll,idArray,level,name,searchName,searchColumn} = this.state;
        console.log(kind);
        
        switch(kind){
            case 'my':
                let arr = [];
                dataMy.news.forEach(e=>{
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
                    history.push('/index/myarticle/page'+ currentPage);
                    getMyData(currentPage,name,searchName,searchColumn);
                    getMyCount(name,searchName,searchColumn);
                    that.tipShow('删除成功');
                    that.setState({isCheckAll:false});
                },50)
                break;
            case 'approve':
                let arr2 = [];
                dataApprove.news.forEach(e=>{
                    if(e.checked){
                        arr2.push(e.id);
                    }
                })
                let ids2 = JSON.stringify(arr2);
                delNewsData(ids2);  //往中间件中发送数据
                let that2 = this;
                setTimeout(function(){
                    if(isCheckAll&&currentPage>1){
                        currentPage--;
                        that.setState({currentPage});
                    }
                    history.push('/index/myarticle/page'+ currentPage);
                    getApproveData(currentPage,name);
                    getAppCount(name,searchName,searchColumn);
                    that2.tipShow('删除成功');
                    that2.setState({isCheckAll:false});
                },50)
                break;
            default:
                return;
        }
    }

    //点击我的稿件
    navMy = ()=>{
        let {getMyCount,getMyData} = this.props;
        let {searchName,searchColumn,name,kind} = this.state;
        //是否切换
        if(kind==='approve'){
            this.setState({
                kind:'my',
                searchName:'',
                searchColumn:'',
            });
            getMyData(1,name);
            getMyCount(1,name,searchName,searchColumn);
            this.refs.search_name.value='';
            this.refs.search_column.value='';
            this.setState({searchName:'',searchColumn:''})
        }
    }

    //点击待审核
    navApprove = ()=>{
        let {getAppCount,getApproveData} = this.props;
        let {searchName,searchColumn,name,kind} = this.state;
        if(kind==='my'){
            this.setState({
                kind:'approve',
                searchName:'',
                searchColumn:'',
            });
            getApproveData(1,name);
            getAppCount(name,searchName,searchColumn);
            this.refs.search_name.value='';
            this.refs.search_column.value='';
            this.setState({searchName:'',searchColumn:''})
        }
    }

     //提示框弹出
    tipShow = (info)=>{
        this.setState({isTipShow:true,tipInfo:info});
        let that = this;
        setTimeout(function(){
            that.setState({isTipShow:false,tipInfo:''});
        },1000)
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

    //关闭弹窗
    closeTan = ()=>{
        this.refs.tan.style.display = 'none';
        this.refs.tan2.style.display = 'none';
    }

    //接收子组件页码
    page = (currentPage)=>{
        this.setState({currentPage,isCheckAll:false});
    }

    render(){
        let {dataMy,dataApprove,dataColumn} = this.props;
        let {searchName,searchColumn,currentPage,kind,isTipShow,tanObj,tipInfo,name,level,isCheckAll} = this.state;
        
        let total = dataApprove.total;
        let count = dataMy.count;

        //控制页面显示
        let sty = 'tab_nav noShow';
        let com = '';
        let btns = '';
        if(level<=2){
            sty = 'tab_nav';
        }
        if(level<=2&&kind==='approve'){
            btns=(
                <div className="btn_sure">
                                <button 
                                    href="javascript:;"
                                    className="sure"
                                    onClick={this.pass}
                                >发布</button>
                                <button 
                                    className="back"
                                    onClick={this.back}
                                >退回</button>
                                <button 
                                    className="cancel"
                                    onClick={this.closeTan}
                                >取消</button>
                            </div>
            )
        }
        if(kind==='my'){
            com = (<button
                onClick={this.add}
            ><i className="fa fa-plus"></i>添加</button>)
        }
        console.log(dataApprove);
        
        //控制数据
        let newArr = [];
        if(kind==="approve"){
            newArr = dataApprove.news;
            count = dataApprove.count;
        }
        if(kind==="my"){
            newArr = dataMy.news;
            count = dataMy.count;
        }
        console.log(newArr);
        
        newArr = newArr.map((e,i)=>{
            let obj={
                key:i,
                i,
                e,
                approveFn:this.approveFn,
                show:this.show,
                del:this.del,
                isCheckAll,
                tipShow:this.tipShow,
                cc:this.cc,
                kind
            }
            return <Tr {...obj} />;
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
                        <input
                            type="text" 
                            placeholder="请输入"
                            onChange={this.changeSearchName}
                            ref="search_name"
                        />
                        <span>所属栏目</span>
                        <input 
                            type="text" 
                            placeholder="请输入"
                            onChange={this.changesearchColumn}
                            ref="search_column"
                        />
                        <button
                            onClick={this.search}
                        >查询</button>
                    </div>
                    <ul className={sty}>
                        <li className={kind==='my'?'active':''}><a 
                                onClick={this.navMy}
                            >我的稿件</a></li>
                        <li className={kind==='approve'?'active':''}><a 
                                onClick={this.navApprove}
                            >待审核</a>
                            <span className="redDot">{total}</span>
                        </li>
                    </ul>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        {com}
                        <button 
                            className="red"
                            onClick={this.delMulti}
                        ><i className="fa fa-trash"></i>批量删除</button>
                    </div>
                    <table className="newsTable">
                        <thead>
                        <tr>
                            <th><input 
                                type="checkbox"
                                checked={isCheckAll?'checked':''}
                                onClick={this.checkAll}
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
                            <th>日期</th>
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
                        kind={kind}
                        name={name}
                        searchName={searchName}
                        searchColumn={searchColumn}
                    />
                </div>
                {/* 文章预览弹框 */}
                <div className="tan_content" ref="tan" >
                    <div className="bg"></div>
                    <div className="tan_box">
                        <div className="tan_title clear">
                            <span>文章预览</span>
                            <i
                                onClick={this.closeTan}
                            >×</i>
                        </div>
                        <div className="preview">
                            <h2>{tanObj.title}</h2>
                            <div className="coledi">
                                <span>{tanObj.column}</span>
                                <span>{tanObj.editor}</span>
                            </div>
                            <p>{tanObj.main}</p>
                            {btns}
                        </div>
                        <span ref="tip" style={{'display':'none'}}>提交成功</span>
                    </div>
                </div>
                {/* 文章添加或修改弹框 */}
                <div className="tan_content" ref="tan2" >
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
                                    disabled
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
        dataMy:state.reducermyarticle,
        dataApprove:state.reducerapprove,
        dataColumn:state.reducercolumn,
        url:ownProps.url
    };
},(dispatch)=>{
    return bindActionCreators(actionCreators,dispatch);
})(MyArticle);