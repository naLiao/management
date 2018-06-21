import React from 'react';

class NewCol extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    closeInNewCol = ()=>{
        let {url:{history:{go}}} = this.props;
        go(-1);
    }
    render(){
        return (
            <div className="tan_content">
                <div className="bg"></div>
                <div className="tan_box">
                    <div className="tan_title clear">
                        <span>添加</span>
                        <i
                            onClick={this.closeInNewCol}
                        >×</i>
                    </div> 
                    <div className="input_content">
                        <div className="input_info">
                            <span>栏目名称：</span>
                            <input type="text" />
                        </div>
                        <div className="input_info">
                            <span>栏目路径：</span>
                            <input type="text" />
                        </div>
                        {/* <div className="input_info">
                            <span>所属分类:</span>
                            <select>
                                <option value="首页轮播">首页轮播</option>
                                <option value="轮播广告">轮播广告</option>
                                <option value="单个广告">单个广告</option>
                            </select>
                        </div> */}
                        {/* <div className="input_info">
                            <span>图片尺寸:</span>
                            <input type="text" className="left_text" />
                            ×
                            <input type="text" className="left_text" />
                        </div> */}
                        {/* <div className="input_info">
                            <span>显示排序:</span>
                            <input type="text" />
                        </div> */}
                        <div className="input_info">
                            <span>头条大图：</span>
                            <input type="radio" name="radio" className="radio_btn" />
                            <span>是</span>
                            <input type="radio" name="radio" className="radio_btn" />
                            <span>否</span>
                        </div>
                        <div className="input_info">
                            <span>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编：</span>
                            <input type="text" />
                        </div>
                        {/* <div className="input_info clear">
                            <span className="tp">图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片:</span>
                            <div className="img_box">
                                
                            </div>
                            <span className="sc">上传</span>
                        </div> */}
                        <div className="btn_sure">
                            <button href="javascript:;" className="sure">提交</button>
                            <button 
                                className="replay"
                                onClick={this.closeInNewCol}
                            >取消</button>
                        </div>
                    </div>   
                </div>
            </div>
        )
    }
}
export default NewCol;