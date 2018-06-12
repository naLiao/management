import React from 'react';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        let {id,title,column,readNum,commentNum,shareNum,editor,status,time} = this.props;
        return (
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>{column}</td>
                <td>{readNum}</td>
                <td>{commentNum}</td>
                <td>{shareNum}</td>
                <td>{editor}</td>
                <td>{status}</td>
                <td>{time}</td>
                <td>
                    <button>修改</button>
                    <button>删除</button>
                </td>
            </tr>
        )
    }
}
export default Tr;