//路由配置页
import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
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
import Account from './Account/account';
import UserManagement from './UserManagement/user';

class App extends Component {
  render() {
    return (
      <div>
          <Header />
          <SideBar />
          <Route exact path='/' component={Index}/>

          {/* 我的稿件 */}
          <Route path='/myarticle' render={url=>{
            return <Redirect to="/myarticle/my" />
          }}/>
          <Route path='/myarticle/:id' render={(url)=>{
              return <MyArticle {...{url}}/>
          }}/>

          {/* 新闻管理 */}
          <Route path='/column' render={(url)=>{
              return <Column {...{url}}/>
          }}/>

          <Route path='/edit' component={Edit}/>
          
          <Route path='/pic' component={Pic} />

          

          <Route path='/readCount' component={ReadCount}/>
          <Route path="/account" component={Account} />
          <Route path="/user" component={UserManagement} />
      </div>
    );
  }
}

export default App;