import React from 'react';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    //修改新闻
    showInTr = ()=>{
        let {show,e} = this.props;
        show(e);
    }
    //删除新闻
    delInTr = ()=>{
        let {del,e} = this.props;
        del(e.id);
    }

    render(){
        let {e,i} = this.props;
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
        d.setTime(d.getTime(e.time));
        let time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{i+1}</td>
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
                        onClick={this.showInTr}
                    ><i className="fa fa-pencil"></i></button>
                    <button 
                        className="red"
                        onClick={this.delInTr}
                    ><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}
export default Tr;