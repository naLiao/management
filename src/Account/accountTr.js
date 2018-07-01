import React from 'react';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    //修改账户
    showInTr = ()=>{
        let {show,e} = this.props;
        show(e);
    }
    //删除账户
    delInTr = ()=>{
        let {del,e} = this.props;
        del(e.id);
    }
    
    render(){
        let {i,e} = this.props;
        let d = new Date();
        d.setTime(e.time);
        let time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        return (
            <tr>
                <td><input type="checkbox"/></td>
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