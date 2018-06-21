import React from 'react';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        let {id,title,column,readNum,commentNum,editor,approve,status,shareNum,time} = this.props;
        let circleClass;
        switch(status){
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
        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{id}</td>
                <td>{title}</td>
                <td>{column}</td>
                <td>{readNum}</td>
                <td>{commentNum}</td>
                <td>{shareNum}</td>
                <td>{editor}</td>
                <td>{approve}</td>
                <td>
                    <i className={circleClass}></i>
                    {status}
                </td>
                <td>{time}</td>
                <td>
                    <button><i className="fa fa-pencil"></i></button>
                    <button className="red"><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}
export default Tr;