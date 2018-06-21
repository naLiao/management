import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../reducers/actions';

class DelBox extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    sure = ()=>{
        let {showDel,data,changeID} = this.props;
        //changeID是拿到当前要禁用的是哪一个
    }

    cancel = ()=>{
        let {showDel} = this.props;
        showDel(false);
    }

    render() {
        return (
            <div className="tan_content">
                <div className="bg"></div>
                <div className="tan_box delete_box">
                    <div className="tan_title clear">
                        <span>禁用</span>
                        <i
                            onClick={this.cancel}
                        >×</i>
                    </div>
                    <div className="text_box">
                        <i></i>
                        <span>确定禁用该账户？</span>
                    </div> 
                    <div className="input_content">
                        <div className="btn_sure btn_two">
                            <button 
                                href="javascript:;" 
                                className="sure"
                                onClick={this.sure}
                            >确定</button>
                            <button 
                                href="javascript:;" 
                                className="cancel"
                                onClick={this.cancel}
                            >取消</button>
                        </div>
                    </div>   
                </div>
            </div>
        );
    }
}

export default connect((state)=>{
    return {data:state.reduceruser};
},(dispatch)=>{
    return {actions:bindActionCreators(actionCreators,dispatch)};
})(DelBox);