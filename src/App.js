//路由配置页
import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';

import HeadSide from './Index/headside';

import MyArticle from './MyArticle/myarticle';

import News from './News/news';

import Column from './Column/column';

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
          <Route path="/" exact render={(url)=>{
            if(document.cookie){
                return <Redirect to="/index/home" />
            }else{
                return <Login url={url}/>
            }
          }} />
        
          {/* 头部和侧边栏 */}
          <Route path='/index' render={()=>{
                if(document.cookie){
                    return <HeadSide />
                }else{  
                    return <Redirect to="/" />
                }
          }}/>

          {/* 首页 */}
          <Route path='/index/home' render={(url)=>{
              return <IndexContent url={url}/>
          }}/>

          {/* 我的稿件 */}         
          <Route path='/index/myarticle/:kind/:id' render={(url)=>{
              return <MyArticle {...{url}}/>
          }}/>

          {/* 新闻管理 */}
          <Route path='/index/news' exact render={()=>{
              return <Redirect to="/index/news/page1" />
          }}/>
          <Route path='/index/news/:id' render={(url)=>{
              return <News {...{url}}/>
          }}/>

          {/* 栏目管理 */}
          <Route path='/index/column' exact render={(url)=>{
              return <Redirect to="/index/news/page1" />
          }}/>
          <Route path='/index/column/:id' render={(url)=>{
              return <Column {...{url}}/>
          }}/>

          {/* 权限管理 */}
          <Route path="/index/account" exact render={(url)=>{
              return <Redirect to="/index/account/page1" />
          }}/>
          <Route path="/index/account/:id" render={(url)=>{
              return <Account url={url} />
          }}/>

          {/* 会员管理 */}
          <Route path="/index/user" render={(url)=>{
              return <User url={url} />
          }}/>

          {/* 系统设置 */}
          <Route path="/index/setting" component={Setting} />
      </div>
    );
  }
}

export default App;