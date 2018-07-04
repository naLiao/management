import React from 'react';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            name:'',
            level:'',
            isChecked:false
         };
    }

    componentDidMount(){
        console.log(123); 
    }

    approveInTr = ()=>{
        let {approveFn,e} = this.props;
        approveFn(e);
    }
    showInTr = ()=>{
        let {show,e} = this.props;
        show(e);
    }
    delInTr = ()=>{
        let {del,e} = this.props;
        del(e.id);
    }

    //点击勾选
    checkInTr = (ev)=>{
        let {e,check} = this.props;
        check(e.id,ev.target.checked);
    }

    render(){
        let {e,isCheckAll} = this.props;
        let {isChecked} = this.state;
        let check = isChecked? 'checked':'';
        let circleClass;
        switch(e.status){
            case '草稿箱':
                circleClass = 'blue';
                break;
            case '修改中':
                circleClass = 'red';
                break;
            case '已发布':
                circleClass = 'green';
                break;
            case '审核中':
                circleClass = 'red';
                break;
            default:
                circleClass = 'green';
        }
        circleClass += ' circle fa fa-circle';
        let d = new Date();
        d.setTime(e.time);
        let time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        return (
            <tr>
                <td><input 
                    type="checkbox"
                    onClick={this.checkInTr}
                /></td>
                <td>{e._id}</td>
                <td>{e.title}</td>
                <td>{e.column}</td>
                <td>{e.readNum}</td>
                <td>{e.commentNum}</td>
                <td>{e.shareNum}</td>
                <td>{e.editor}</td>
                <td>{e.approve}</td>
                <td>
                    <i className={circleClass}></i>
                    {e.status}
                </td>
                <td>{time}</td>
                <td>
                    <button
                        onClick={this.approveInTr}
                    ><i className="fa fa-check"></i></button>
                    <button
                        onClick={this.showInTr}
                    ><i className="fa fa-pencil"></i></button>
                    <button
                        onClick={this.delInTr}
                        className="red"
                    ><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}
export default Tr;