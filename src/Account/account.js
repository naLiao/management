import React,{Component} from 'react';
import './account.css';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="content">
                <div className="tableBox">
                    <p>管理员列表</p>
                </div>
            </div>
        );
    }
}

export default Account;