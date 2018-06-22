import React from 'react';
import './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            account:'',
            password:'',
            tip:'',
            isTipShow:false
         };
    }
    //输入账号
    changeAccount = (ev)=>{
        this.setState({account:ev.target.value});
    }
    //输入密码
    changePassword = (ev)=>{
        this.setState({password:ev.target.value});
    }
    //点击登录
    login = ()=>{
        let {account,password} = this.state;
        if(!account || !password){
            this.setState({tip:'输入不能为空'});
            this.setState({isTipShow:true});
            let that = this;
            setTimeout(function(){
                that.setState({isTipShow:false});
            },1000)
        }else{
            //请求用户名和密码是否正确
            
        }
    }
    render() {
        let {account,password,tip,isTipShow} = this.state;
        let c = isTipShow?'tip':'tip none';
        return (
            <div className="login">
                <div className="loginBox">
                    <div className="user">
                        <i className="fa fa-user"></i>
                        <label>账号</label>
                        <input
                            type="text" 
                            placeholder="请输入账号"
                            value={account}
                            onChange={this.changeAccount}
                        />
                    </div>
                    <div className="password">
                        <i className="fa fa-lock"></i>
                        <label>密码</label>
                        <input 
                            type="text" 
                            placeholder="请输入密码"
                            value={password}
                            onChange={this.changePassword}
                        />
                    </div>
                    <button
                        onClick={this.login}
                    >登录</button>
                    <span
                        className={c}
                        ref="tip"
                    >{tip}</span>
                </div>
            </div>
        );
    }
}

export default Login;