//路由配置页
import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import Header from './Header/header';
import SideBar from './SideBar/sidebar';

import Index from './Index/index';

import MyArticle from './MyArticle/myarticle';
import Edit from './Edit/edit';

import News from './News/news';

import Column from './Column/column';
import NewCol from './Column/newcol';

import Account from './Account/account';

import User from './User/user';

import Setting from './Setting/setting';

class App extends Component {
  render() {
    return (
      <div>
          {/* 头部和侧边栏 */}
          <Header />
          <SideBar />

          {/* 首页 */}
          <Route exact path='/' render={()=>{
              return <Redirect to="/index" />
          }}/>
          <Route exact path='/index' component={Index}/>

          {/* 我的稿件 */}
          <Route exact path='/myarticle' render={()=>{
              return <Redirect to="/myarticle/my" />
          }}/>
          <Route path='/myarticle/:id' render={(url)=>{
              return <MyArticle {...{url}}/>
          }}/>
          <Route path='/edit' component={Edit}/>

          {/* 新闻管理 */}
          <Route exact path='/news' render={()=>{
              return <Redirect to="/news/headline" />
          }}/>
          <Route path='/news/:id' render={(url)=>{
              return <News {...{url}}/>
          }}/>

          {/* 栏目管理 */}
          <Route path='/column' render={(url)=>{
              return <Column {...{url}}/>
          }}/>
          <Route path='/column/new' render={(url)=>{
              return <NewCol {...{url}}/>
          }}/>

          {/* 权限管理 */}
          <Route path="/account" component={Account} />

          {/* 会员管理 */}
          <Route path="/user" component={User} />

          {/* 系统设置 */}
          <Route path="/setting" component={Setting} />
      </div>
    );
  }
}

export default App;