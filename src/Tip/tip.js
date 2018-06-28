import React,{Component} from 'react';
import './tip.css';

class Tip extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        let {isTipShow,tipInfo} = this.props;
        
        let cla = isTipShow ? 'tip' :'tip noShow'
        return (
            <div className={cla}>
                <span>{tipInfo}</span>
            </div>
        );
    }
}

export default Tip;