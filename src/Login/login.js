import React from 'react';
import './login.css';
import cookie from 'react-cookies';

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(this);
        
        this.state = { 
            account:'',
            password:'',
            tip:'',
            isTipShow:false,
            isSevenDay:false
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

    //点击勾选免登录
    check = (ev)=>{
        this.setState({isSevenDay:ev.target.checked});
    }

    //点击登录
    login = ()=>{
        let {account,password,isSevenDay} = this.state;
        
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
            fetch('http://127.0.0.1:88/api/account/login',{
                method:"post",
                body :`account=${account}&password=${password}&isSevenDay=${isSevenDay}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(e=>e.json())
            .then(data => {
                console.log(data);
                if(data.code === 0){
                    let level = data.userInfo.level;
                    this.setState({tip:'登录成功！',isTipShow:true},()=>{
                        setTimeout(()=>{
                            history.push('/index/home');
                        },1000);
                    });
                    //种Cookie
                    if(isSevenDay){  //设置失效期为7天  
                        const expires = new Date()
                        expires.setDate(expires.getDate() + 7)
                        cookie.save(
                            'user',
                            account,
                            {
                              path: '/',
                              expires
                            }
                        )
                        cookie.save(
                            'level',
                            level,
                            {
                              path: '/',
                              expires
                            }
                        )
                    }else{
                        cookie.save('user', account, { path: '/' })
                        cookie.save('level', level, { path: '/' })
                    }
                    // cookie.save('user', account, { path: '/' })
                    // cookie.save('level', level, { path: '/' })
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
                <ul className="accounts">
                    <li>
                        <span>超级管理员(admin admin):账户管理</span>
                    </li>
                    <li>
                        <span>主编(李二 123):新建稿件、审核稿件</span>
                    </li>
                    <li>
                        <span>编辑(张三 123):新建稿件</span>
                    </li>
                </ul>
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
                </div>
                <div
                        className={c}
                        ref="tip"
                    >{tip}</div>
            </div>
        );
    }
}

export default Login;