import React from 'react';
import {Link,NavLink} from 'react-router-dom';
import NewsList from './newslist';
import './column.css';

class Column extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            colArr:[
                {
                    name:'头条',
                    path:'/column/headline'
                },
                {
                    name:'时事',
                    path:'/column/current'
                },
                {
                    name:'财经',
                    path:'/column/finance'
                },
                {
                    name:'生活',
                    path:'/column/life'
                }
            ]
        };
    }
    render(){
        let {colArr} = this.state;
        let newArr = colArr.map(e=>{
            return <li><NavLink to={e.path} className="active">{e.name}</NavLink></li>
        })
        return (
            <div className="content1">
                <div className="colBox">
                    <ul className="subNav">
                        {newArr}
                    </ul>
                    <Link to="/column/newCol"><button id="createNews">新建栏目</button></Link>
                    <Link to="/edit"><button id="createNews">新建稿件</button></Link>
                </div>
            </div>
        )
    }
}
export default Column;