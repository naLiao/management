import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import cookie from 'react-cookies'
import './column.css';
import ColumnTr from './columnTr';
import Tip from '../Tip/tip';
import Page from '../Page/page';

class Column extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            //是否全选
            isCheckAll:false,
            //勾选数组
            idArray:[],
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
                column:'',
                path:'',
                approve:''
            }
         };
    }

    componentWillMount(){
        this.setState({name: cookie.load('user'),level:Number(cookie.load('level'))});
    }

    //初始化
    componentDidMount (){
        let {getColumnData,getColCount} = this.props;
        let {currentPage} = this.state;

        console.log('栏目页初始化'+currentPage);
        //获取栏目
        getColumnData(1);  //走中间件，页码
        //获取页码
        getColCount();  //走中间件
    }

    componentWillReceiveProps({url:{match:{params:{id:id1}}}}){
        //切换页码
        let {url:{match:{params:{id}}},getColumnData} = this.props;
        let currentPage = id1.split('page')[1]*1;
        this.setState({currentPage});
        if(id1 !== id){
            console.log('页码切换，要请求数据了'+ currentPage);
            getColumnData(currentPage);  //走中间件，栏目+页码
        }
    }

    //添加栏目
    add = ()=>{
        let {level} = this.state;
        if(level>2){
            this.tipShow('您的级别不够');
            return;
        }else{
            this.refs.tan.style.display = 'block';
            this.setState({tanObj:{
                column:'',
                path:'',
                approve:'',
                readNum:0,
                time:''
            },id:''})
        }
    }
    
    //修改栏目
    show = (e)=>{
        this.setState({tanObj:e,id:e.id});
        this.refs.tan.style.display = 'block';
    }

    submit = async ()=>{
        let {editColumnData,getColumnData,getColCount,addColumn} = this.props;
        let {tanObj,id,currentPage} = this.state;
        console.log(id);
        if(!id){
            //添加栏目
            await addColumn(tanObj);  //往中间件中发送数据
            this.refs.tan.style.display = 'none';
            await getColumnData(currentPage);
            await getColCount();
            this.tipShow('添加成功');
        }else{
            //修改栏目
            await editColumnData(id,tanObj);  //往中间件中发送数据
            this.refs.tan.style.display = 'none';
            await getColumnData(currentPage);
            await getColCount();
            this.tipShow('修改成功');
        }
    }

    //删除一个
    del = (id)=>{
        let {dataColumn,getColumnData,getColCount,delColData,history} = this.props;
        let {path,currentPage} = this.state;
        let ids = JSON.stringify([id]);
        delColData(ids);  //往中间件中发送数据
        let that = this;
        setTimeout(function(){
            if(dataColumn.columns.length===1&&currentPage>1){
                currentPage--;
                that.setState({currentPage});
                history.push('/index/column/page'+ currentPage);
                getColCount();
            }else{
                getColumnData(currentPage);
                getColCount();
            }
            that.tipShow('删除成功');
        },50);
}

    //点击批量删除
    delMulti = ()=>{
        let {getColumnData,getColCount,delColData,url:{history}} = this.props;
        let {currentPage,isCheckAll,idArray,level} = this.state;

        if(level>2){
            this.tipShow('您的级别不够');
            return;
        }else{
            //批量删除
            let ids = JSON.stringify(idArray);
            delColData(ids);  //往中间件中发送数据
            let that = this;
            setTimeout(function(){
                if(isCheckAll&&currentPage>1){
                    currentPage--;
                    that.setState({currentPage});
                    history.push('/index/column/page'+ currentPage);
                    getColCount();
                }else{
                    getColumnData(currentPage);
                    getColCount();
                }
                let inputs = Array.from(document.querySelectorAll('.newsTable tbody input'));
                inputs.forEach(e=>e.checked=false);
                that.tipShow('删除成功');
                that.setState({isCheckAll:false});
            },50);
        }
    }

    //接收组件勾选，勾选就放数组里，取消勾选就从数组中删除
    check = (id,isTrue)=>{
        let {idArray,isCheckAll} = this.state;

        if(isTrue){  //勾选
            idArray.push(id);
            this.setState({idArray});
        }else{  //取消勾选
            idArray = idArray.filter(e=>e!=id);
            this.setState({idArray});
        }
        console.log(idArray);
        let inputs = document.querySelectorAll('.newsTable tbody input');
        if(idArray.length === inputs.length){
            this.setState({isCheckAll:true});
        }else{
            this.setState({isCheckAll:false});
        }
    }

    //勾选全部
    checkAll = (ev)=>{
        let {dataColumn} = this.props;
        let {idArray} = this.state;
        let inputs = Array.from(document.querySelectorAll('.newsTable tbody input'));
        inputs.forEach(e=>e.checked=ev.target.checked);

        this.setState({isCheckAll:ev.target.checked});
        
        //将所有ID放入数组
        if(ev.target.checked){
            dataColumn.columns.forEach(e=>{
                idArray.push(e.id);
            })
        }else{
            idArray = [];
        }
        console.log(idArray);
        this.setState({idArray});
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
    changeApprove = (ev)=>{
        let {tanObj} = this.state;
        tanObj.approve = ev.target.value;
        this.setState({tanObj});
    }

    render(){
        let {getNewsData,dataColumn,url:{match:{params:{id}}},url:{history:{push}}} = this.props;  //栏目数据 新闻数据
        let {isTipShow,path,tanObj,isCheckAll,tipInfo} = this.state;  //控制提示框是否出现
        let count = dataColumn.count;  //页码
        let currentPage = id.split('page')[1]*1;  //当前页
        let columns = dataColumn.columns;
        
        //渲染栏目数据
        let newArr = columns.map((e,i)=>{
            let obj={
                key:i,
                e,
                show:this.show,
                del:this.del,
                tipShow:this.tipShow,
                check:this.check
            }
            return <ColumnTr {...obj} />;
        })
        return (
            <div className="content1">
                <Tip isTipShow={isTipShow} tipInfo={tipInfo}/>
                {/* <div className="bread_menu">
                    <Link to="/">首页 --></Link>
                    <Link to="/column">栏目管理</Link>
                </div> */}
                <div className="table_top">
                    <div className="big">搜索查询</div>
                    <div className="tab_search">
                        <span>栏目名称</span>
                        <input type="text" placeholder="请输入"/>
                        <button>查询</button>
                    </div>
                </div>
                <div className="table_main">
                    <div className="tableBtns">
                        <button
                            onClick={this.add}
                        ><i className="fa fa-plus"></i>添加栏目</button>
                        {/* <button><i className="fa fa-pencil"></i>修改栏目</button> */}
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
                                checked={isCheckAll}
                                onChange={this.checkAll}
                            /></th>
                            <th>栏目名称</th>
                            <th>栏目路径</th>
                            <th>新闻数量</th>
                            <th>主编</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            {newArr}
                        </tbody>
                    </table>
                    <Page len={count} path="/index/column" currentPage={1} push={push} />
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
                                <span>栏目名称：</span>
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
                                <span>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编：</span>
                                <input 
                                    type="text"
                                    value={tanObj.approve}
                                    onChange={this.changeApprove}
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
        dataColumn:state.reducercolumn,
        url:ownProps.url
    };
},dispatch=>bindActionCreators(actionCreators,dispatch))(withRouter(Column));