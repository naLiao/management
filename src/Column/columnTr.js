import React from 'react';

class ColumnTr extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        let {column,newsNum,approve,time} = this.props;
        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{column}</td>
                <td>{newsNum}</td>
                <td>{approve}</td>
                <td>{time}</td>
                <td>
                    <button className="showcolumnNewsBtn">新闻列表</button>
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