import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions'; 
import cookie from 'react-cookies'
import './user.css';
import Tr from './userTr';
import Tip from '../Tip/tip';
import Page from './page';

class User extends React.Component {
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
                user:'',
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
        let {getUserData,getUserCount} = this.props;
        let {searchName,searchKind} = this.state;

        getUserData(1);  
        getUserCount(searchName,searchKind);  //走中间件
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
        let {getuserData,searchuserData,getuserCount,url:{history}} = this.props;
        let {searchName,searchKind,currentPage} = this.state;
        
        //获取会员
        if(!searchName&&!searchKind){
            getuserData(1);
            getuserCount(searchName,searchKind);
        }else{
            searchuserData(1,searchName,searchKind); 
            getuserCount(searchName,searchKind);
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
        let {datauser} = this.props;
        let {isCheckAll} = this.state;

        isCheckAll = !isCheckAll;

        datauser.users.forEach(e=>{
            e.checked = isCheckAll;
        })

        this.setState({isCheckAll});
    }

    //添加会员
    add = ()=>{
        let {level} = this.state;
        if(level>1){
            this.tipShow('您的级别不够');
            return;
        }else{
            this.refs.tan.style.display = 'block';
            this.setState({tanObj:{
                user:'',
                password:'',
                kind:'',
                level:''
            },id:''})
        }
    }
    
    //修改会员
    show = (e)=>{
        this.setState({
            tanObj:{
                user:e.user,
                password:e.password,
                kind:e.kind,
                level:e.level
            },
            id:e.id
        });
        this.refs.tan.style.display = 'block';
    }

    submit = ()=>{
        let {getuserData,getuserCount,adduser,editAccData} = this.props;
        let {tanObj,id,searchName,searchKind,currentPage} = this.state;
        
        if(!id){
            //添加会员
            adduser(tanObj);  //往中间件中发送数据
            this.refs.tan.style.display = 'none';
            getuserData(currentPage);
            getuserCount(searchName,searchKind);
            this.tipShow('添加成功');
        }else{
            //修改会员
            editAccData(id,tanObj);  //往中间件中发送数据
            getuserData(currentPage);
            getuserCount(searchName,searchKind);
            this.refs.tan.style.display = 'none';
            this.tipShow('修改成功');
        }
    }

    //删除一个
    del = (id)=>{
        let {getuserData,datauser,getuserCount,delAccData, url:{history}} = this.props;
        let {path,currentPage,searchName,searchKind} = this.state;
        let ids = JSON.stringify([id]);
        delAccData(ids);  //往中间件中发送数据
        let that = this;
        setTimeout(function(){
            if(datauser.users.length===1 &&currentPage>1){
                currentPage--;
                that.setState({currentPage});
                history.push('/index/user/page'+ currentPage);
                getuserCount(searchName,searchKind);
            }else{
                getuserData(currentPage);
                getuserCount(searchName,searchKind);
            }
            that.tipShow('删除成功');
        },50);
    }
    
    //点击批量删除
    delMulti = ()=>{
        let {datauser,getuserData,getuserCount,delAccData,url:{history}} = this.props;
        let {currentPage,isCheckAll,idArray,level,searchName,searchKind} = this.state;

        if(level>1){
            this.tipShow('您的级别不够');
            return;
        }else{
            //批量删除
            let arr = [];
            datauser.users.forEach(e=>{
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
                history.push('/index/user/page'+ currentPage);
                getuserData(currentPage);
                getuserCount(searchName,searchKind);
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
    changeuser = (ev)=>{
        let {tanObj} = this.state;
        tanObj.user = ev.target.value;
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
        let {datauser,match:{params:{id}},history:{push}} = this.props; 
        let {user,isTipShow,tanObj,tipInfo,id:tanId,isCheckAll,searchName,searchKind} = this.state; 
        // console.log(id);
        let count = datauser.count;  //页码
        let currentPage = id.split('page')[1]*1;  //当前页
        let users = datauser.users;
        let title = tanId? '修改': '添加';
        let newArr = [].map((e,i)=>{
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
                        <span>会员名称</span>
                        <input 
                            type="text" 
                            placeholder="请输入"
                            value={searchName}
                            onChange={this.changeSearchName}
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
                        ><i className="fa fa-plus"></i>添加</button> */}
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
                            <th>会员名称</th>
                            <th>会员手机</th>
                            <th>账号状态</th>
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
                                <span>会员名称：</span>
                                <input
                                    type="text" 
                                    value={tanObj.user}
                                    onChange={this.changeuser}
                                />
                            </div>
                            <div className="input_info">
                                <span>会员密码：</span>
                                <input 
                                    type="text"
                                    value={tanObj.password}
                                    onChange={this.changePassword}
                                />
                            </div>
                            <div className="input_info">
                                <span>会员种类：</span>
                                <input 
                                    type="text"
                                    value={tanObj.kind}
                                    onChange={this.changeKind}
                                />
                            </div>
                            <div className="input_info">
                                <span>会员级别：</span>
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
        datauser:state.reduceruser,
        url:ownProps.url
    };
},dispatch=>bindActionCreators(actionCreators,dispatch))(withRouter(User));