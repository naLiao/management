import React from 'react';
import Simditor from 'simditor/lib/simditor';
import 'simditor/styles/simditor.css';

class Editor extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    componentDidMount(){
        var textbox = React.findDOMNode(this.refs.textarea);
        // var editor = new Simditor({
        //     textarea: 123
        // });
    }
    render(){
        return (
            <div>
                <textarea ref='textarea' />
            </div>
        )
    }
}
export default Editor;