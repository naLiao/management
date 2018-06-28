import React from 'react';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    //修改账户
    showInTr = ()=>{
        let {show,e} = this.props;
        console.log(e);
        
        show(e);
    }
    //删除账户
    delInTr = ()=>{
        let {del,e} = this.props;
        console.log(e);
        
        del(e.id);
    }
    
    render(){
        let {i,e} = this.props;
        
        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{i+1}</td>
                <td>{e.account}</td>
                <td>{e.kind}</td>
                <td>{e.level}</td>
                <td>{e.time}</td>
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