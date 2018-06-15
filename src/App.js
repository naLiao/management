//路由配置页
import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from './Header/header';
import SideBar from './SideBar/sidebar';
import Index from './Index/index';

import Column from './Column/column';
import NewCol from './Column/newcol';

import Pic from './Pic/pic';

import ReadCount from "./ReadCount/readcount";
import Edit from './Edit/edit';
import NewsList from './Column/newslist';
import MyArticle from './MyArticle/myarticle';
import ArticleList from "./MyArticle/articlelist";
import UserManagement from './UserManagement/user';

class App extends Component {
  render() {
    return (
      <div>
          <Header />
          <SideBar />
          <Route exact path='/' component={Index}/>

          <Route path='/column' component={Column}/>
          <Route path="/column/newCol" component={NewCol} />
          <Route path='/column/:id' render={(url)=>{
                return <NewsList {...{url}}/>
          }}/>
          <Route path='/edit' component={Edit}/>

          <Route path='/pic' component={Pic} />

          <Route path='/myarticle' component={MyArticle}/>
          <Route path='/myarticle/:id' render={(url)=>{
              return <ArticleList {...{url}}/>
          }}/>

          <Route path='/readCount' component={ReadCount}/>
          <Route path="/usermanagement" component={UserManagement} />
      </div>
    );
  }
}

export default App;
