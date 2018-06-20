import React from 'react';

class Tr extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        let {id,name,kind,level,time} = this.props;
        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>{id}</td>
                <td>{name}</td>
                <td>{kind}</td>
                <td>{level}</td>
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