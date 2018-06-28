import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';
import './column.css';
import ColumnTr from './columnTr';
import NewCol from './newcol';
import Tip from '../Tip/tip';
import Page from '../Page/page';

class Column extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
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
        //判断是否登录
        let {url:{history}} = this.props;
        if(!document.cookie){
            history.push('/');
        }
    }
    
    //初始化
    componentDidMount (){
        let {getColumnData,getColCount} = this.props;
        console.log('初始化');
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
        this.refs.tan.style.display = 'block';
        this.setState({tanObj:{
            column:'',
            path:'',
            approve:'',
            readNum:0,
            time:''
        },id:''})
    }
    
    //修改栏目
    show = (e)=>{
        this.setState({tanObj:e,id:e.id});
        this.refs.tan.style.display = 'block';
    }

    submit = async ()=>{
        let {tanObj,id,currentPage} = this.state;
        console.log(id);
        
        if(!id){
            //添加栏目
            let {getColumnData,getColCount,addColumn} = this.props;
            await addColumn(tanObj);  //往中间件中发送数据
            this.refs.tan.style.display = 'none';
            await getColumnData(currentPage);
            await getColCount();
            this.tipShow('添加成功');
        }else{
            //修改栏目
            // let {editNewsData} = this.props;
            // editNewsData(id,tanObj);  //往中间件中发送数据
            // this.refs.tan.style.display = 'none';
            // this.tipShow('修改成功');
        }
    }

    //删除栏目，删除完成后重新渲染数据、页码
    del = async (id)=>{
        let {getColumnData,getColCount,delColData} = this.props;
        let {path,currentPage} = this.state;
        await delColData(id,currentPage);  //往中间件中发送数据
        await getColumnData(currentPage);
        await getColCount();
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
        let {isTipShow,path,tanObj,tipInfo} = this.state;  //控制提示框是否出现
        let count = dataColumn.count;  //页码
        let currentPage = id.split('page')[1]*1;  //当前页
        let columns = dataColumn.columns;
        
        //渲染栏目数据
        let newArr = columns.map((e,i)=>{
            let obj={
                key:i,
                e,
                show:this.show,
                del:this.del
            }
            return <ColumnTr {...obj} />;
        })
        return (
            <div className="content1">
                <Tip isTipShow={isTipShow} tipInfo={tipInfo}/>
                <div className="bread_menu">
                    <Link to="/">首页 --></Link>
                    <Link to="/column">栏目管理</Link>
                </div>
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
                        <button><i className="fa fa-pencil"></i>修改栏目</button>
                        <button className="red"><i className="fa fa-trash"></i>删除</button>
                    </div>
                    <table className="newsTable">
                        <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
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
},dispatch=>bindActionCreators(actionCreators,dispatch))(Column);