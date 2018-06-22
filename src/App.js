//路由配置页
import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';

import HeadSide from './Index/headside';

import MyArticle from './MyArticle/myarticle';
import Edit from './Edit/edit';

import News from './News/news';

import Column from './Column/column';
import NewCol from './Column/newcol';

import Account from './Account/account';

import User from './User/user';

import Setting from './Setting/setting';

import Login from './Login/login';
import IndexContent from './Index/index';

class App extends Component {
  render() {
    return (
      <div>
          {/* 登录 */}
          <Route path="/" exact component={Login} />
        
          {/* 头部和侧边栏 */}
          <Route path='/index' component={HeadSide}/>

          {/* 首页 */}
          <Route path='/index/home' component={IndexContent}/>

          {/* 我的稿件 */}
          <Route exact path='/index/myarticle' render={()=>{
              return <Redirect to="/index/myarticle/my" />
          }}/>
          <Route path='/index/myarticle/:id' render={(url)=>{
              return <MyArticle {...{url}}/>
          }}/>
          <Route path='/index/edit' component={Edit}/>

          {/* 新闻管理 */}
          <Route exact path='/index/news' render={()=>{
              return <Redirect to="/index/news/headline" />
          }}/>
          <Route path='/index/news/:id' render={(url)=>{
              return <News {...{url}}/>
          }}/>

          {/* 栏目管理 */}
          <Route path='/index/column' render={(url)=>{
              return <Column {...{url}}/>
          }}/>
          <Route path='/index/column/new' render={(url)=>{
              return <NewCol {...{url}}/>
          }}/>

          {/* 权限管理 */}
          <Route path="/index/account" component={Account} />

          {/* 会员管理 */}
          <Route path="/index/user" component={User} />

          {/* 系统设置 */}
          <Route path="/index/setting" component={Setting} />
      </div>
    );
  }
}

export default App;