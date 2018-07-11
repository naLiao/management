import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import cookie from 'react-cookies'
import './account.css';
import Tr from './accountTr';
import Tip from '../Tip/tip';
import Page from './page';

class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            //按名称查询
            searchName:'',
            searchKind:'',
            //是否全选
            isCheckAll:false,
            //当前用户
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
                account:'',
                password:'',
                kind:'',
                level:''
            }
         };
    }
    
    componentWillMount(){
        this.setState({name: cookie.load('user'),level:Number(cookie.load('level'))});
    }
    
    //初始化
    componentDidMount (){
        let {getAccountData,getAccountCount} = this.props;
        let {searchName,searchKind} = this.state;
        // console.log('账户页');
        //获取账户
        getAccountData(1);  //走中间件，页码
        //获取页码
        getAccountCount(searchName,searchKind);  //走中间件
    }

    //修改查询名称
    changeSearchName = (ev)=>{
        this.setState({searchName:ev.target.value})
    }

    //修改查询种类
    select = (ev)=>{
        this.setState({searchKind:ev.target.value})
    }

    //查询
    search = ()=>{
        let {getAccountData,searchAccountData,getAccountCount,url:{history}} = this.props;
        let {searchName,searchKind,currentPage} = this.state;
        
        //获取账户
        if(!searchName&&!searchKind){
            getAccountData(1);
            getAccountCount(searchName,searchKind);
        }else{
            searchAccountData(1,searchName,searchKind); 
            getAccountCount(searchName,searchKind);
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
        let {dataAccount} = this.props;
        let {isCheckAll} = this.state;

        isCheckAll = !isCheckAll;

        dataAccount.accounts.forEach(e=>{
            e.checked = isCheckAll;
        })

        this.setState({isCheckAll});
    }

    //添加账户
    add = ()=>{
        let {level} = this.state;
        if(level>1){
            this.tipShow('您的级别不够');
            return;
        }else{
            this.refs.tan.style.display = 'block';
            this.setState({tanObj:{
                account:'',
                password:'',
                kind:'',
                level:''
            },id:''})
        }
    }
    
    //修改账户
    show = (e)=>{
        this.setState({
            tanObj:{
                account:e.account,
                password:e.password,
                kind:e.kind,
                level:e.level
            },
            id:e.id
        });
        this.refs.tan.style.display = 'block';
    }

    submit = ()=>{
        let {getAccountData,getAccountCount,addAccount,editAccData} = this.props;
        let {tanObj,id,searchName,searchKind,currentPage} = this.state;
        
        if(!id){
            //添加账户
            addAccount(tanObj);  //往中间件中发送数据
            this.refs.tan.style.display = 'none';
            getAccountData(currentPage);
            getAccountCount(searchName,searchKind);
            this.tipShow('添加成功');
        }else{
            //修改账户
            editAccData(id,tanObj);  //往中间件中发送数据
            getAccountData(currentPage);
            getAccountCount(searchName,searchKind);
            this.refs.tan.style.display = 'none';
            this.tipShow('修改成功');
        }
    }

    //删除一个
    del = (id)=>{
        let {getAccountData,dataAccount,getAccountCount,delAccData, url:{history}} = this.props;
        let {path,currentPage,searchName,searchKind} = this.state;
        let ids = JSON.stringify([id]);
        delAccData(ids);  //往中间件中发送数据
        let that = this;
        setTimeout(function(){
            if(dataAccount.accounts.length===1 &&currentPage>1){
                currentPage--;
                that.setState({currentPage});
                history.push('/index/account/page'+ currentPage);
                getAccountCount(searchName,searchKind);
            }else{
                getAccountData(currentPage);
                getAccountCount(searchName,searchKind);
            }
            that.tipShow('删除成功');
        },50);
    }
    
    //点击批量删除
    delMulti = ()=>{
        let {dataAccount,getAccountData,getAccountCount,delAccData,url:{history}} = this.props;
        let {currentPage,isCheckAll,idArray,level,searchName,searchKind} = this.state;

        if(level>1){
            this.tipShow('您的级别不够');
            return;
        }else{
            //批量删除
            let arr = [];
            dataAccount.accounts.forEach(e=>{
                if(e.checked){
                    arr.push(e.id);
                }
            })
            console.log(arr);
            let ids = JSON.stringify(arr);
            delAccData(ids);  //往中间件中发送数据
            let that = this;
            setTimeout(function(){
                if(isCheckAll&&currentPage>1){
                    currentPage--;
                    that.setState({currentPage});
                }
                console.log(currentPage);
                history.push('/index/account/page'+ currentPage);
                getAccountData(currentPage);
                getAccountCount(searchName,searchKind);
                that.tipShow('删除成功');
                that.setState({isCheckAll:false});
            },50)
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

    //关闭弹窗
    closeTan = ()=>{
        this.refs.tan.style.display = 'none';
    }

    //修改弹窗内容
    changeAccount = (ev)=>{
        let {tanObj} = this.state;
        tanObj.account = ev.target.value;
        this.setState({tanObj});
    }
    changePassword = (ev)=>{
        let {tanObj} = this.state;
        tanObj.password = ev.target.value;
        this.setState({tanObj});
    }
    changeKind = (ev)=>{
        let {tanObj} = this.state;
        tanObj.kind = ev.target.value;
        this.setState({tanObj});
    }
    changeLevel = (ev)=>{
        let {tanObj} = this.state;
        tanObj.level = ev.target.value;
        this.setState({tanObj});
    }

    //接收子组件页码
    page = (currentPage)=>{
        this.setState({currentPage,isCheckAll:false});
    }

    render(){
        let {dataAccount,url:{match:{params:{id}}},url:{history:{push}}} = this.props;  //栏目数据 新闻数据
        let {account,isTipShow,tanObj,tipInfo,id:tanId,isCheckAll,searchName,searchKind} = this.state;  //控制提示框是否出现
        // console.log(dataAccount);
        let count = dataAccount.count;  //页码
        let currentPage = id.split('page')[1]*1;  //当前页
        let accounts = dataAccount.accounts;
        let title = tanId? '修改': '添加';
        let newArr = accounts.map((e,i)=>{
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
            
            return <Tr {...obj} />;
        })

        return (
            <div className="content1">
                <Tip isTipShow={isTipShow} tipInfo={tipInfo}/>
                <div className="table_top">
                    <div className="big">搜索查询</div>
                    <div className="tab_search">
                        <span>账户名称</span>
                        <input 
                            type="text" 
                            placeholder="请输入"
                            value={searchName}
                            onChange={this.changeSearchName}
                        />
                        <span>账户种类</span>
                        <select 
                            id="account_kind"
                            onChange={this.select}
                        >
                            <option value=''>所有分类</option>
                            <option value="超级管理员">超级管理员</option>
                            <option value="主编">主编</option>
                            <option value="编辑">编辑</option>
                        </select>
                        <button
                            onClick={this.search}
                        >查询</button>
                    </div>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        <button
                            onClick={this.add}
                        ><i className="fa fa-plus"></i>添加</button>
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
                                onChange={this.checkAll}
                            /></th>
                            <th>ID</th>
                            <th>账户名称</th>
                            <th>账户种类</th>
                            <th>级别</th>
                            <th>创建时间</th>
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
                        searchKind={searchKind}
                    />
                </div>

                {/* 弹框 */}
                <div className="tan_content" ref="tan" >
                    <div className="bg"></div>
                    <div className="tan_box">
                        <div className="tan_title clear">
                            <span>{title}</span>
                            <i
                                onClick={this.closeTan}
                            >×</i>
                        </div> 
                        <div className="input_content">
                            <div className="input_info">
                                <span>账户名称：</span>
                                <input
                                    type="text" 
                                    value={tanObj.account}
                                    onChange={this.changeAccount}
                                />
                            </div>
                            <div className="input_info">
                                <span>账户密码：</span>
                                <input 
                                    type="text"
                                    value={tanObj.password}
                                    onChange={this.changePassword}
                                />
                            </div>
                            <div className="input_info">
                                <span>账户种类：</span>
                                <input 
                                    type="text"
                                    value={tanObj.kind}
                                    onChange={this.changeKind}
                                />
                            </div>
                            <div className="input_info">
                                <span>账户级别：</span>
                                <input 
                                    type="text"
                                    value={tanObj.level}
                                    onChange={this.changeLevel}
                                />
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
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state,ownProps)=>{
    return {
        dataAccount:state.reduceraccount,
        url:ownProps.url
    };
},dispatch=>bindActionCreators(actionCreators,dispatch))(Account);