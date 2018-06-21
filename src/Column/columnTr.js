import React from 'react';
import {Link} from 'react-router-dom';

class ColumnTr extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        let {column:columnName,newsNum,approve,path,time} = this.props;
        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{columnName}</td>
                <td>{newsNum}</td>
                <td>{approve}</td>
                <td>{time}</td>
                <td>
                    <Link to={path}
                        className="showcolumnNewsBtn"
                    >新闻列表</Link>
                </td>
                <td>
                    <button><i className="fa fa-pencil"></i></button>
                    <button className="red"><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }
}
export default ColumnTr;