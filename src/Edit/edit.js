import React from 'react';
import { Link } from 'react-router-dom';
// import Editor from './Editor/editor';
import './edit.css';

class Edit extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            title:'',
            column:'',
            tag:[],
            abstract:'',
            picSrc:'',
            content:'',
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
    //输入tag标签
    tagInput = (ev)=>{
        let val = ev.target.value;
        this.setState({tag:val.split(',')});
    }
    //输入简介
    abstractInput = (ev)=>{
        this.setState({abstract:ev.target.value});
    }
    //输入内容
    contentInput = (ev)=>{
        this.setState({content:ev.target.value});
    }
    render(){
        let {title,abstract,content} = this.state;
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
                        <div className="tag">
                            <label>tag标签(以英文逗号分隔)</label>
                            <input 
                                type="text" 
                                onChange={this.tagInput}
                            />
                        </div>
                        <div>
                            <label>简介</label>
                            <textarea
                                value={abstract}
                                onChange={this.abstractInput}
                            ></textarea>
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
                                value={content}
                                onChange={this.contentInput}
                            ></textarea>
                        </div>
                        <div className="divider"></div>
                        <span className="btns">
                            <button id="submit" className="greenBtn">提交</button>
                            <button id="submit" className="greenBtn">保存</button>
                            <button id="submit" className="greenBtn">取消</button>
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}
export default Edit;