import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import './account.css';
import Tr from './accountTr';
import Tip from '../Tip/tip';
import Page from '../Page/page';

class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            //当前用户
            account:'',
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
        //判断是否登录
        let {getAccDetail,url:{history}} = this.props;
        if(!document.cookie){
            history.push('/');
        }else{
            let account = document.cookie.split('user=')[1];
            this.setState({account});  //获取当前登录用户名
            //根据用户名获取用户信息
            getAccDetail(account);
        }
    }

    //初始化
    componentDidMount (){
        let {getAccountData,getAccountCount} = this.props;
        console.log('账户页初始化');
        //获取账户
        getAccountData(1);  //走中间件，页码
        //获取页码
        getAccountCount();  //走中间件
    }

    //添加账户
    add = ()=>{
        this.refs.tan.style.display = 'block';
        this.setState({tanObj:{
            account:'',
            password:'',
            kind:'',
            level:''
        },id:''})
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

    submit = async ()=>{
        let {tanObj,id,currentPage} = this.state;
        
        if(!id){
            //添加账户
            let {getAccountData,getAccountCount,addAccount} = this.props;
            console.log(tanObj);
            await addAccount(tanObj);  //往中间件中发送数据
            this.refs.tan.style.display = 'none';
            await getAccountData(currentPage);
            await getAccountCount();
            this.tipShow('添加成功');
        }else{
            //修改账户
            let {editAccData} = this.props;
            editAccData(id,tanObj);  //往中间件中发送数据
            this.refs.tan.style.display = 'none';
            this.tipShow('修改成功');
        }
    }

    //删除账户，删除完成后重新渲染数据、页码
    del = async (id)=>{
        let {getAccountData,getAccountCount,delAccData, url:{history:{location}}} = this.props;
        let {path,currentPage} = this.state;
        await delAccData(id);  //往中间件中发送数据
        // location.reload();  //不知道为什么拿不到这里的reload方法，返回undefined
        getAccountData(currentPage);
        getAccountCount();
        this.tipShow('删除成功');
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

    render(){
        let {dataAccount,url:{match:{params:{id}}},url:{history:{push}}} = this.props;  //栏目数据 新闻数据
        let {account,isTipShow,tanObj,tipInfo,id:tanId} = this.state;  //控制提示框是否出现
        
        // let count = dataAccount.count;  //页码
        // let currentPage = id.split('page')[1]*1;  //当前页
        let accounts = dataAccount.accounts;
        let title = tanId? '修改': '添加';
        let newArr = accounts.map((e,i)=>{
            let obj={
                key:i,
                i,
                e,
                show:this.show,
                del:this.del
            }
            return <Tr {...obj} />;
        })
        return (
            <div className="content1">
                <Tip isTipShow={isTipShow} tipInfo={tipInfo}/>
                <div className="table_top">
                    <div className="big">搜索查询</div>
                    <div className="tab_search">
                        <span>名字</span>
                        <input type="text" placeholder="请输入"/>
                        <span>账户种类</span>
                        <select id="account_kind">
                            <option value="admin">超级管理员</option>
                            <option value="charge">主编</option>
                            <option value="editor">编辑</option>
                        </select>
                        <button>查询</button>
                    </div>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        <button
                            onClick={this.add}
                        ><i className="fa fa-plus"></i>添加</button>
                        <button><i className="fa fa-pencil"></i>修改</button>
                        <button className="red"><i className="fa fa-trash"></i>删除</button>
                    </div>
                    <table className="newsTable">
                        <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>ID</th>
                            <th>名字</th>
                            <th>账户种类</th>
                            <th>级别</th>
                            <th>上次登录时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            {newArr}
                        </tbody>
                    </table>
                    <Page len={4} path="/index/column" currentPage={1} push={push} />
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