import React,{Component} from 'react';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentWillMount(){
        //判断是否登录
        let {url:{history}} = this.props;
        if(!document.cookie){
            history.push('/');
        }
    }
    
    render() {
        return (
            <div className="content">
                系统设置界面
            </div>
        );
    }
}

export default Setting;