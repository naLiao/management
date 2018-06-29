import React,{Component} from 'react';
import Header from '../Header/header';
import SideBar from '../SideBar/sidebar';

class HeadSide extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    render() {
        return (
            <div>
                <Header />
                <SideBar />
            </div>
        );
    }
}

export default HeadSide;