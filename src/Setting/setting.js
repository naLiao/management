import React,{Component} from 'react';
import './setting.css';
import Tip from '../Tip/tip';
import cookie from 'react-cookies'

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:'',
            level:'',
            oldPassword:'',
            newPassword1:'',
            newPassword2:'',
            //提示框是否显示
            isTipShow:false,
            tipInfo:'',
         };
    }

    componentWillMount(){
        this.setState({name: cookie.load('user'),level:Number(cookie.load('level'))});
    }

    //输入旧密码
    changeold = (ev)=>{
        this.setState({oldPassword:ev.target.value});
    }

    //第一次输入新密码
    changePassword1 = (ev)=>{
        this.setState({newPassword1:ev.target.value});
    }

    //第二次输入新密码
    changePassword2 = (ev)=>{
        this.setState({newPassword2:ev.target.value});
    }

    //验证旧密码
    oldPasswordVerify = ()=>{
        let {name,oldPassword} = this.state;
        if(!oldPassword) return;
        fetch('http://127.0.0.1:88/api/user/login',{
                method:"post",
                body :`account=${name}&password=${oldPassword}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(e=>e.json())
            .then(data => {
                console.log(data);
                if(data.code === -3){
                    this.tipShow('旧密码错误');
                    this.refs.right.style.opacity = 0;
                    this.refs.oldPassword.select();  //选中旧密码
                    this.refs.password2.style.display = 'none';
                    this.refs.password3.style.display = 'none';
                }
                if(data.code === 0){
                    this.refs.right.style.opacity = 1; 
                    this.refs.password2.style.display = 'block';
                    this.refs.password3.style.display = 'block';
                    this.refs.sureBtn.style.cursor = 'pointer';
                }
            })



    }

    //发送请求
    sure = ()=>{
        let {name,newPassword1,newPassword2,oldPassword} = this.state;
        if(newPassword1 !== newPassword2){
            this.tipShow('两次密码不一致');
        }else{
            if(newPassword1.length<6){
                this.tipShow('密码至少6位');
            }else{
                if(newPassword1 === oldPassword){
                    this.tipShow('密码没有修改');
                }else{
                    fetch('http://127.0.0.1:88/api/user/update',{
                        method:"post",
                        body :`account=${name}&password=${newPassword1}`,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(e=>e.json())
                    .then(data => {
                        if(data.code === 0){
                            this.tipShow('密码修改成功');
                            this.refs.oldPassword.value = '';
                            this.refs.password2_input.value = '';
                            this.refs.password3_input.value = '';
                            this.refs.right.style.opacity = 0;
                            this.refs.password2.style.display = 'none';
                            this.refs.password3.style.display = 'none';
                        }
                    })
                }
            }
        }
    }

    //提示框弹出
    tipShow = (info)=>{
        this.setState({isTipShow:true,tipInfo:info});
        let that = this;
        setTimeout(function(){
            that.setState({isTipShow:false,tipInfo:''});
        },1000)
    }

    render() {
        let {name,isTipShow,tipInfo} = this.state;
        
        return (
            <div className="content">
                <Tip isTipShow={isTipShow} tipInfo={tipInfo}/>
               <div className="input_content2" ref="content2">
                    <div className="input_info">
                        <span className='s1'>用户名：</span>
                        <input type="text" className='i1'
                            disabled
                            value={name}
                        />
                    </div>
                    <div className="input_info">
                        <span className='s1'>旧密码：</span>
                        <input 
                            type="password" 
                            className='i1' 
                            ref="oldPassword"
                            onChange={this.changeold}
                            onBlur={this.oldPasswordVerify}
                        />
                        <i ref="right" className="fa fa-check"></i>
                    </div>
                    <div className="input_info no-show" ref="password2">
                        <span className='s1'>新密码：</span>
                        <input 
                            type="password" 
                            className='i1' 
                            ref="password2_input"
                            onChange={this.changePassword1} 
                        />
                    </div>
                    <div className="input_info no-show" ref="password3">
                        <span className='s1'>确认密码：</span>
                        <input 
                            type="password" 
                            className='i1' 
                            ref="password3_input"
                            onChange={this.changePassword2} 
                        />
                    </div>

                    <div className="btn_sure">
                        <button 
                            className="sure2"
                            onClick={this.sure}
                            ref="sureBtn"
                        >提交</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Setting;