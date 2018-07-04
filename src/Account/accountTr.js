import React from 'react';
import cookie from 'react-cookies'

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            //当前登录用户
            name:'',
            level:'',
         };
    }

    componentWillMount(){
        this.setState({name: cookie.load('user'),level:Number(cookie.load('level'))});
    }

    //修改账户
    showInTr = ()=>{
        let {show,tipShow,e} = this.props;
        let {level} = this.state;
        if(level>1){
            tipShow('您的级别不够');
        }else{
            show(e);
        }
    }
    //删除账户
    delInTr = ()=>{
        let {del,tipShow,e} = this.props;
        let {level} = this.state;
        if(level>1){
            tipShow('您的级别不够');
        }else{
            del(e.id);
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

    //点击勾选
    checkInTr = (ev)=>{
        let {e,check} = this.props;
        check(e.id,ev.target.checked);
    }
    
    render(){
        let {i,e} = this.props;
        let {isCheck} = this.state;
        
        let d = new Date();
        d.setTime(e.time);
        let time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        return (
            <tr>
                <td><input 
                    type="checkbox"
                    onChange={this.checkInTr}
                /></td>
                <td>{i+1}</td>
                <td>{e.account}</td>
                <td>{e.kind}</td>
                <td>{e.level}</td>
                <td>{time}</td>
                <td>
                    <button
                        onClick={this.showInTr}
                    ><i className="fa fa-pencil"></i></button>
                    <button 
                        onClick={this.delInTr}
                    className="red"><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}
export default Tr;