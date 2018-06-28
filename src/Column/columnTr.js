import React from 'react';
// import {Link} from 'react-router-dom';

class ColumnTr extends React.Component {
    constructor(props){
        super(props);
        this.state = {  };
    }

    //修改栏目
    showInTr = ()=>{
        let {show,e} = this.props;
        show(e);
    }
    //删除栏目
    delInTr = ()=>{
        let {del,e} = this.props;
        del(e.id);
    }

    render(){
        let {e} = this.props;
        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{e.column}</td>
                <td>{e.path}</td>
                <td>{e.readNum}</td>
                <td>{e.approve}</td>
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
export default ColumnTr;