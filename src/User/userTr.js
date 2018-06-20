import React from 'react';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        let {id,name,email,phone,commentNum,time} = this.props;
        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{commentNum}</td>
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