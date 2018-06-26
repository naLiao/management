import React from 'react';
import { Link } from 'react-router-dom';
// import Editor from './Editor/editor';
import './edit.css';
//引入图片
// import

class Edit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            picSrc:'',
            main:'',
            column: '',
            path:'',
            editor:'',
            approve:'',
            isTop: false
         };
    }
    //输入标题
    titleInput = (ev)=>{
        this.setState({title:ev.target.value});
    }
    //改变栏目
    columnChange = (ev)=>{
        this.setState({column:ev.target.value});
    }
    //输入栏目路径
    pathInput = (ev)=>{
        this.setState({path:ev.target.value});
    }
    //输入编辑
    editorInput = (ev)=>{
        this.setState({editor:ev.target.value});
    }
    //输入主编
    approveInput = (ev)=>{
        this.setState({approve:ev.target.value});
    }
    //输入内容
    mainInput = (ev)=>{
        this.setState({main:ev.target.value});
    }
    //是否置顶
    top = ()=>{
        this.setState({isTop:true});
    }
    notop = ()=>{
        this.setState({isTop:false});
    }
    //提交
    submit = ()=>{
        let {title,picSrc,main,column,path,editor,approve,isTop} = this.state;
        let obj = {
            title,
            picSrc,
            main,
            column,
            path,
            editor,
            approve,
            isTop
        }
        //添加新闻
        fetch('http://127.0.0.1:88/api/news/add',{
            method:"post",
            body :new URLSearchParams({obj}).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(e=>e.json())
        .then(data => {
            console.log(data);
            if(data.code === 0){
                console.log('登录成功');
                
            }else if(data.code === -3){
                
            }
        })
    }
    render(){
        let {title,picSrc,main,column,path,editor,approve,isTop} = this.state;
        return (
            <div className='content1'>
                <div className="bread_menu">
                    <Link to="/">首页 --></Link>
                    <Link to="/myarticle">我的稿件 --></Link>
                    <Link to="/edit">新建稿件</Link>
                </div>
                <form>
                    <div className="submitBox">
                        <div>
                            <label>新闻标题<i>*</i></label>
                            <input 
                                type="text"
                                value={title}
                                onChange={this.titleInput}
                            />
                        </div>
                        <div>
                            <label>投放栏目<i>*</i></label>
                            <select
                                onChange={this.columnChange}
                            >
                                <option value ="头条">头条</option>
                                <option value ="时事">时事</option>
                                <option value="财经">财经</option>
                                <option value="生活">生活</option>
                            </select>
                        </div>
                        <div>
                            <label>栏目路径<i>*</i></label>
                            <input 
                                type="text" 
                                onChange={this.pathInput}
                            />
                        </div>
                        <div>
                            <label>编辑<i>*</i></label> 
                            <input 
                                type="text" 
                                onChange={this.editorInput}
                            />
                        </div>
                        <div>
                            <label>主编<i>*</i></label>
                            <input 
                                type="text" 
                                onChange={this.approveInput}
                            />
                        </div>
                        <div>
                            <label>置顶<i>*</i></label>
                            <label className="topBox" htmlFor="top1">
                                <input 
                                id="top1"
                                type="radio"
                                name="top"
                                checked={isTop?true:false}
                                onChange={this.top}
                                />是
                            </label>
                            <label className="topBox" htmlFor="top2">
                                <input 
                                id="top2" 
                                type="radio" 
                                name="top"
                                checked={isTop?false:true}
                                onChange={this.notop}
                                />否</label>
                        </div>
                        <div>
                            <label>标题图</label>
                            <button className="blueBtnS">浏览</button>
                            <span>未选择文件</span>
                            <button className="blueBtnS2">上传</button>
                        </div>
                        <div>
                            <label>标题图预览</label>
                            <img className="imgPreview" src="img/iconMe.png"  />
                        </div>
                        <div className="main_content">
                            <label>内容</label>
                            <textarea
                                value={main}
                                onChange={this.mainInput}
                            ></textarea>
                        </div>
                        <div className="divider"></div>
                        <span className="btns">
                            <button 
                                id="submit" 
                                className="greenBtn"
                                onClick={this.submit}
                            >提交</button>
                            <button
                                id="submit"
                                className="greenBtn"
                                onClick={this.submit}
                            >保存</button>
                            <button id="cancel" className="greenBtn">取消</button>
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}
export default Edit;