import React from 'react';
// import Editor from './Editor/editor';
import './edit.css';

class Edit extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        return (
            <form className='content'>
                <div className="submitBox">
                    <div>
                        <label className="f163">标题<i>*</i></label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>投放栏目<i>*</i></label>
                        <select>
                            <option value ="头条">精选</option>
                            <option value ="图文">时事</option>
                            <option value="社会">财经</option>
                            <option value="自然">生活</option>
                        </select>
                    </div>
                    <div>
                        <label>tag标签</label>
                        <input name="mail" type="text" />
                    </div>
                    <div>
                        <label>简介</label>
                        <textarea></textarea>
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
                    <div>
                        <label>内容编辑器<i>*</i></label>
                        {/*<Editor />*/}
                    </div>
                    <div className="divider"></div>
                    <span className="btns">
                        <button id="submit" className="greenBtn">提交</button>
                        <button id="submit" className="greenBtn">保存</button>
                        <button id="submit" className="greenBtn">取消</button>
                    </span>
                </div>
            </form>
        )
    }
}
export default Edit;