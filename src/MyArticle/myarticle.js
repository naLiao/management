import React from 'react';
import {NavLink} from 'react-router-dom';

class MyArticle extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        return (
            <div className="content">
                <div className="colBox">
                    <ul className="subNav">
                        <li><NavLink to="/myarticle/posted" className="active">已发稿件</NavLink></li>
                        <li><NavLink to="/myarticle/draft" activeClassName='active'>草稿箱</NavLink></li>
                        <li><NavLink to="/myarticle/deleted" activeClassName='active'>回收箱</NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default MyArticle;