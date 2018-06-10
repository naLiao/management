import React from 'react';
import {Link,NavLink} from 'react-router-dom';
import NewsList from './newslist';
import './column.css';

class Column extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        return (
            <div className="content1">
                <div className="colBox">
                    <ul className="subNav">
                        <li><NavLink to="/column/headline" className="active">头条</NavLink></li>
                        <li><NavLink to="/column/current" activeClassName='active'>时事</NavLink></li>
                        <li><NavLink to="/column/finance" activeClassName='active'>财经</NavLink></li>
                        <li><NavLink to="/column/life" activeClassName='active'>生活</NavLink></li>
                    </ul>
                    <Link to="/edit"><button id="createNews">新建稿件</button></Link>
                </div>
            </div>
        )
    }
}
export default Column;