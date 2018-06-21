import React from 'react';
import {combineReducers} from 'redux';

//1.我的稿件数据，根据登录账号动态获取
const myarticleArr=[
    {
        id:1,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'头条',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'草稿箱',
        time:'2018-6-5'
    },
    {
        id:2,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'财经',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'修改中',
        time:'2018-6-5'
    },
    {
        id:3,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'时事',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'修改中',
        time:'2018-6-5'
    },
    {
        id:4,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'生活',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'已发布',
        time:'2018-6-5'
    },
    {
        id:5,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'头条',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'已发布',
        time:'2018-6-5'
    },
    {
        id:6,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'头条',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'已发布',
        time:'2018-6-5'
    }
];
const reducermyarticle = (state=myarticleArr,action)=>{
    switch(action.type){
        case 'ACTION_TYPE':
            return '';
        default:
            return state;
    }
}

//2.我的待审核稿件数据
const approveArr=[
    {
        id:1,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'时事',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'审核中',
        time:'2018-6-5'
    },
    {
        id:2,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'时事',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'审核中',
        time:'2018-6-5'
    },
    {
        id:3,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'时事',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'审核中',
        time:'2018-6-5'
    },
    {
        id:4,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'时事',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'审核中',
        time:'2018-6-5'
    },
    {
        id:5,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'时事',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'审核中',
        time:'2018-6-5'
    }
]
const reducerapprove = (state=approveArr,action)=>{
    switch(action.type){
        case 'ACTION_TYPE':
            return '';
        default:
            return state;
    }
}

//3.栏目数据
const columnArr=[
    {
        id:1,
        column:'头条',
        path:'headline',
        readNum:'1234',
        approve:'李二',
        time:'2018-6-5'
    },
    {
        id:2,
        column:'时事',
        path:'current',
        readNum:'1234',
        approve:'李二',
        time:'2018-6-5'
    },
    {
        id:3,
        column:'财经',
        path:'finance',
        readNum:'1234',
        approve:'李二',
        time:'2018-6-5'
    },
    {
        id:4,
        column:'生活',
        path:'life',
        readNum:'1234',
        approve:'李二',
        time:'2018-6-5'
    }
];
const reducercolumn = (state=columnArr,action)=>{
    switch(action.type){
        case 'ACTION_TYPE':
            return '';
        default:
            return state;
    }
}

//4.所有新闻数据
const newsArr=[
    {
        id:1,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'头条',
        path:'headline',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'草稿箱',
        time:'2018-6-5'
    },
    {
        id:2,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'财经',
        path:'finance',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'修改中',
        time:'2018-6-5'
    },
    {
        id:3,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'时事',
        path:'current',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'修改中',
        time:'2018-6-5'
    },
    {
        id:4,
        title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
        column:'生活',
        path:'life',
        readNum:'1234',
        commentNum:'35',
        shareNum:'56',
        editor:'张三',
        approve:'李二',
        status:'已发布',
        time:'2018-6-5'
    }
];
const reducernews = (state=newsArr,action)=>{
    switch(action.type){
        case 'ACTION_TYPE':
            return '';
        default:
            return state;
    }
}

//5.会员数据
const userArr=[
    {
        id:1,
        name:'张三',
        email:'24352345@qq.com',
        phone:13838985679,
        commentNum:38,
        status:'stop',
        time:'2018-6-5'
    },
    {
        id:2,
        name:'张三',
        email:'24352345@qq.com',
        phone:13838985679,
        commentNum:38,
        status:'stop',
        time:'2018-6-5'
    },
    {
        id:3,
        name:'张三',
        email:'24352345@qq.com',
        phone:13838985679,
        commentNum:38,
        status:'stop',
        time:'2018-6-5'
    },
    {
        id:4,
        name:'张三',
        email:'24352345@qq.com',
        phone:13838985679,
        commentNum:38,
        status:'normal',
        time:'2018-6-5'
    },
    {
        id:5,
        name:'张三',
        email:'24352345@qq.com',
        phone:13838985679,
        commentNum:38,
        status:'normal',
        time:'2018-6-5'
    },
    {
        id:6,
        name:'张三',
        email:'24352345@qq.com',
        phone:13838985679,
        commentNum:38,
        status:'normal',
        time:'2018-6-5'
    },
    {
        id:7,
        name:'张三',
        email:'24352345@qq.com',
        phone:13838985679,
        commentNum:38,
        status:'normal',
        time:'2018-6-5'
    },
    {
        id:8,
        name:'张三',
        email:'24352345@qq.com',
        phone:13838985679,
        commentNum:38,
        status:'normal',
        time:'2018-6-5'
    },
    {
        id:9,
        name:'张三',
        email:'24352345@qq.com',
        phone:13838985679,
        commentNum:38,
        status:'normal',
        time:'2018-6-5'
    },
    {
        id:10,
        name:'张三',
        email:'24352345@qq.com',
        phone:13838985679,
        commentNum:38,
        status:'normal',
        time:'2018-6-5'
    }
]
const reduceruser = (state=userArr,action)=>{
    switch(action.type){
        case 'CHANGE_USER_STATUS':
            let tmpArr = state.slice();
            tmpArr.forEach(e=>{
                if(e.id===action.id){
                    e.status = action.status;
                }
            })
            return tmpArr;
        default:
            return state;
    }
}

const reducer3 = (state=[],action)=>{
    switch(action.type){
        case 'ADD_TO_CART':
            let arr = [...state];
            let obj = arr.find(e=>e.id===action.e.id);
            if(obj){
                if(obj.num<obj.stock) obj.num++;
                obj.currentTotal = (obj.price*obj.num).toFixed(2);
            }else{
                obj = action.e;
                obj.num = action.num;
                obj.currentTotal = (obj.price*action.num).toFixed(2);
                arr.push(obj);
            }
            return arr;
        case 'ADD_NUM':
            return state.map(e=>{
                if(e.id===action.id){
                    if(e.num<e.stock) e.num++;
                    e.currentTotal = (e.price*e.num).toFixed(2);
                }
                return e;
            })
        case "MINUS_NUM":
            return state.filter(e=>{
                if(e.id===action.id){
                    e.num--;
                    e.currentTotal = (e.price*e.num).toFixed(2);
                }
                return e.num > 0;
            })
        default:
            return state;
    }
}

const reducers = combineReducers({
    reducermyarticle,
    reducerapprove,
    reducercolumn,
    reducernews,
    reduceruser,
    reducer3
});

export {reducers};