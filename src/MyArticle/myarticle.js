import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './myarticle.css';
import Tr from './myarticleTr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import cookie from 'react-cookies'
import Page from '../Page/page';

class MyArticle extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
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

    componentWillMount(){
        let {getMyData,getMyCount,getColumnData,getApproveData,getAppCount} = this.props;
        let {tanObj} = this.state;
        //获取当前登录用户名和级别
        let name = cookie.load('user');
        let level = Number(cookie.load('level'));
        this.setState({name,level});
        //判断级别获取已审核数据
        if(level<=2){
            getApproveData(name,1);
            getAppCount(name);
        }
        getColumnData(1);
        getMyData(name,1);
        getMyCount(name);
    }

    componentWillReceiveProps({url:{match:{params:{id:id1}}}}){
        let {url:{match:{params}},getMyData,getApproveData} = this.props;
        let {name,level} = this.state;
        let currentPage = id1.split('page')[1]*1;
        this.setState({currentPage});
        
        if(id1 !== params.id){
            getApproveData(name);
            switch(params.kind){
                case 'my':
                    getMyData(name,currentPage);
                    break;
                case 'approve':
                    getApproveData(name,currentPage);
                    break;
                default:
                    getMyData(name,currentPage);
            }
        }
    }

    //点击全选
    checkAll = (ev)=>{
        let {dataMy,dataApprove,dataColumn,url:{location:{pathname}},url:{match:{params:{kind}}},url:{history:{push}}} = this.props;
        let {tanObj,idArray,name,currentPage} = this.state;
        
        switch(kind){
            case 'my':
                //将当前页面所有ID存储起来，批量提交数据
                if(ev.target.checked){
                    for(let i=0;i<dataMy.news.length;i++){
                        idArray.push(dataMy.news[i].id);
                    }
                }else{
                    idArray = [];
                }
                this.setState({isCheckAll:ev.target.checked,idArray});
                break;
            case 'approve':
                if(ev.target.checked){
                    for(let i=0;i<dataApprove.news.length;i++){
                        idArray.push(dataApprove.news[i].id);
                    }
                }else{
                    idArray = [];
                }
                this.setState({isCheckAll:ev.target.checked,idArray});
                break;
            default:
                return;
        }
    }

    //子组件勾选
    check = (id,isCheck)=>{
        let {idArray} = this.state;
        if(isCheck){
            idArray.push(id);
        }else{
            idArray = idArray.filter(e=>e!==id);
        }
        let inputs = document.querySelectorAll('.newsTable tbody tr td input');
        if(idArray.length===inputs.length){
            this.setState({isCheckAll:true});
        }else{
            this.setState({isCheckAll:false});
        }
    }

    approveFn = (e)=>{
        this.setState({tanObj:e,id:e.id});
        this.refs.tan.style.display = 'block';
    }

    //发布稿件
    pass = async()=>{
        let {approveArticle,getApproveData,getAppCount,url:{history:{location}}} = this.props;
        let {name,currentPage} = this.state;
        let {id} = this.state;
        await approveArticle(id);
        this.refs.tan.style.display = 'none';
        this.tipShow('发布成功');
        await getApproveData(name,currentPage);
        await getAppCount(name);
    }

    //退回稿件
    back = async()=>{
        let {approveArticle,getApproveData,editNewsData,getAppCount,url:{history:{location}}} = this.props;
        let {name,currentPage} = this.state;
        let {tanObj,id} = this.state;
        console.log(tanObj);
        
        await editNewsData(id,tanObj,'已退回');
        this.refs.tan.style.display = 'none';
        this.tipShow('退回成功');
        await getApproveData(name,currentPage);
        await getAppCount(name);
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
        let {getMyData,getApproveData,editNewsData,getMyCount,addnews,url:{match:{params:{kind}}}} = this.props;
        let {tanObj,id,name,currentPage} = this.state;
        
        switch(kind){
            case 'my':
                if(!id){
                    //添加新闻
                    await addnews(tanObj,'审核中');  
                    await getMyData(name,currentPage);
                    await getMyCount(name);
                    this.refs.tan2.style.display = 'none';
                    await this.tipShow('添加成功');
                }else{
                    //修改新闻
                    editNewsData(id,tanObj,'审核中');  
                    this.refs.tan2.style.display = 'none';
                    this.tipShow('修改成功');
                }
                break;
            case 'approve':
                editNewsData(id,tanObj,'审核中');  //往中间件中发送数据
                this.refs.tan2.style.display = 'none';
                this.tipShow('修改成功');
                // getApproveData(name,currentPage);
                break;
            default:
                return;
        }
    }

    //保存稿件
    draft = async()=>{
        let {getMyData,editNewsData,getMyCount,addnews,url:{match:{params:{kind}}}} = this.props;
        let {tanObj,id,name,currentPage} = this.state;
        if(!id){
            await addnews(tanObj,'编辑中');  
            await getMyData(name,currentPage);
            await getMyCount(name);
            this.refs.tan2.style.display = 'none';
            await this.tipShow('保存成功');
        }else{
            await editNewsData(id,tanObj,'编辑中');
            this.refs.tan2.style.display = 'none';
            await this.tipShow('保存成功');
        }
    }

    //删除稿件
    del = async (id)=>{
        let {delNewsData,getMyData,getApproveData,editNewsData,getMyCount,getAppCount,addnews,url:{match:{params:{kind}}}} = this.props;
        let {tanObj,name,currentPage} = this.state;
        
        switch(kind){
            case 'my':
                await delNewsData(id,currentPage);
                this.refs.tan2.style.display = 'none';
                await this.tipShow('删除成功');
                await getMyData(name,currentPage);
                await getMyCount(name);
                break;
            case 'approve':
                editNewsData(id,tanObj);  
                await delNewsData(id,currentPage);  
                await getApproveData(name,currentPage);
                await getAppCount(name);
                this.refs.tan2.style.display = 'none';
                this.tipShow('删除成功');
                break;
            default:
                return;
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

    render(){
        let {dataMy,dataApprove,dataColumn,url:{location:{pathname}},url:{match:{params}},url:{history:{push}}} = this.props;
        let {isTipShow,path,tanObj,tipInfo,name,level,isCheckAll} = this.state;
        let currentPage = params.id.split('page')[1]*1;  //当前页
        let sty = 'tab_nav noShow';  //默认子菜单不显示
        let newArr = [];  //要渲染的数组
        let total;
        let count;
        let com = '';
        let btns = '';
        // console.log(dataMy.news);

        if(level<=2){
            //显示子菜单
            sty = 'tab_nav';
            total = dataApprove.total;
            //判断当前是哪个子菜单
            switch(params.kind){
                case 'my':
                    newArr = dataMy.news;
                    count = dataMy.count;
                    com = (
                        <button
                            onClick={this.add}
                        ><i className="fa fa-plus"></i>添加</button>
                    );
                    break;
                case 'approve':
                    newArr = dataApprove.news;
                    count = dataApprove.count;
                    break;
                default:
                    newArr = dataMy.news;
            }
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
        }else{
            com = (
                <button
                    onClick={this.add}
                ><i className="fa fa-plus"></i>添加</button>
            );
            count = dataMy.count;
            newArr = dataMy.news;
        }
        newArr = newArr.map((e,i)=>{
            let obj={
                key:i,
                i,
                e,
                approveFn:this.approveFn,
                show:this.show,
                del:this.del,
                isCheckAll,
                check:this.check
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
                    <ul className={sty}>
                        <li><NavLink to="/index/myarticle/my/page1" activeClassName="active">我的稿件</NavLink></li>
                        <li className="redDotLi">
                            <NavLink to="/index/myarticle/approve/page1" activeClassName="active">
                                待审核
                            </NavLink>
                            <span className="redDot">{total}</span>
                        </li>
                    </ul>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        {com}
                        <button className="red"><i className="fa fa-trash"></i>批量删除</button>
                    </div>
                    <table className="newsTable">
                        <thead>
                        <tr>
                            <th><input 
                                type="checkbox"
                                checked={isCheckAll}
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
                    <Page len={count} path={`/index/myarticle/${params.kind}`} currentPage={currentPage} push={push} />
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
        dataMy:state.reducermyarticle,
        dataApprove:state.reducerapprove,
        dataColumn:state.reducercolumn,
        url:ownProps.url
    };
},(dispatch)=>{
    return bindActionCreators(actionCreators,dispatch);
})(MyArticle);