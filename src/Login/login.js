import React from 'react';
import './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            account:'',
            password:'',
            tip:'',
            isTipShow:false,
            isChecked:false
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

    //点击勾选
    check = (ev)=>{
        this.setState({isChecked:ev.target.checked});
    }

    //点击登录
    login = ()=>{
        let {account,password,isChecked} = this.state;
        let {url:{history}} = this.props;
        if(!account || !password){
            this.setState({tip:'输入不能为空'});
            this.setState({isTipShow:true});
            let that = this;
            setTimeout(function(){
                that.setState({isTipShow:false});
            },1000)
        }else{
            //开始登录
            fetch('http://127.0.0.1:88/api/user/login',{
                method:"post",
                body :`username=${account}&password=${password}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(e=>e.json())
            .then(data => {
                console.log(data);
                if(data.code === 0){
                    this.setState({tip:'登录成功！',isTipShow:true},()=>{
                        setTimeout(()=>{
                            history.push('/index/home');
                        },1000);
                    });
                    //种Cookie
                    if(isChecked){
                        var days=7;
                        var expTime  = new Date();
                        expTime.setTime(expTime.getTime() + days*24*60*60*1000);
                        document.cookie = 'user='+ account+';expires='+ expTime.toUTCString();
                    }else{
                        document.cookie = 'user='+ account;
                    }
                }else if(data.code === -3){
                    this.setState({tip:data.msg,isTipShow:true,account:'',password:''},()=>{
                        setTimeout(()=>{
                            this.setState({isTipShow:false});
                        },1000);
                    });
                }
            })
        }
    }
    render() {
        let {account,password,tip,isTipShow} = this.state;
        let c = isTipShow?'tip':'tip none';
        return (
            <div className="login">
                <span>用户名123，密码123</span>
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
                            type="password" 
                            placeholder="请输入密码"
                            value={password}
                            onChange={this.changePassword}
                        />
                    </div>
                    <div className="seven">
                        <input 
                            type="checkbox"
                            onChange={this.check}
                        />
                        <span>7天免登录</span>
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