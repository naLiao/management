import React from 'react';
import cookie from 'react-cookies'

class ColumnTr extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            //当前登录用户
            name:'',
            level:''
         };
    }

    componentWillMount(){
        this.setState({name: cookie.load('user'),level:Number(cookie.load('level'))});
    }

    //修改栏目
    showInTr = ()=>{
        let {show,tipShow,e} = this.props;
        let {level} = this.state;
        if(level>2){
            tipShow('您的级别不够');
        }else{
            show(e);
        }
    }
    //删除栏目
    delInTr = ()=>{
        let {del,tipShow,e} = this.props;
        let {level} = this.state;
        if(level>2){
            tipShow('您的级别不够');
        }else{
            del(e.id);
        }
    }

    render(){
        let {e} = this.props;
        let d = new Date();
        d.setTime(d.getTime(e.time));
        let time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{e.column}</td>
                <td>{e.path}</td>
                <td>{e.readNum}</td>
                <td>{e.approve}</td>
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
export default ColumnTr;