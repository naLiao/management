import {combineReducers} from 'redux';

//1.新闻管理
const reducernews = (state={news:[],count:0,total:0},action)=>{
    switch(action.type){
        //初始化获取数据
        case 'GET_DATA':
            let newObj = Object.assign({},state);
            newObj.news = action.res;
            return newObj;
        //往新闻列表里添加一条新闻
        case 'GET_COUNT':
            let newObj2 = Object.assign({},state);
            newObj2.count = action.count;
            newObj2.total = action.total;
            return newObj2;
        case 'SEARCH_NEWS':
            let newObj3 = Object.assign({},state);
            newObj3.news = action.res;
            return newObj3;
        default:
            return state;
    }
}

//2.栏目数据
const reducercolumn = (state={columns:[],count:0,total:0},action)=>{
    switch(action.type){
        case 'GET_COLUMN':
            let newObj = Object.assign({},state);
            newObj.columns = action.res;
            // console.log(action.res);
            return newObj;
        case 'GET_COL_COUNT':
            let newObj2 = Object.assign({},state);
            newObj2.count = action.count;
            newObj2.total = action.total;
            // console.log(action.count);
            return newObj2;
        case 'SEARCH_COLUMN':
            let newObj3 = Object.assign({},state);
            newObj3.columns = action.res;
            console.log(action.res);
            return newObj3;
        default:
            return state;
    }
}

//3.我的稿件数据
const reducermyarticle = (state={news:[],count:0},action)=>{
    switch(action.type){
        case 'GET_MY':
            let newObj = Object.assign({},state);
            newObj.news = action.res;
            // console.log(action.res);
            return newObj;
        case 'GET_MY_COUNT':
            let newObj2 = Object.assign({},state);
            newObj2.count = action.count;
            // console.log(action.count);
            return newObj2;
        case 'SEARCH_MY':
            let newObj3 = Object.assign({},state);
            newObj3.news = action.res;
            // console.log(action.res);
            return newObj3;
        default:
            return state;
    }
}

//4.待审核数据
const reducerapprove = (state={news:[],count:0,total:0},action)=>{
    switch(action.type){
        case 'GET_APPROVE':
            let newObj = Object.assign({},state);
            newObj.news = action.res;
            return newObj;
        case 'GET_APP_COUNT':
            let newObj2 = Object.assign({},state);
            newObj2.total = action.total;
            newObj2.count = action.count;
            // console.log(state);
            return newObj2;
        case 'SEARCH_APPROVE':
            let newObj3 = Object.assign({},state);
            newObj3.news = action.res;
            return newObj3;
        default:
            return state;
    }
}

//5.账户数据
const reduceraccount = (state={accounts:[],count:0,total:0},action)=>{
    switch(action.type){
        case 'GET_ACCOUNT':
            let newObj = Object.assign({},state);
            newObj.accounts = action.res;
            // console.log(action.res);
            return newObj;
        case 'GET_ACC_COUNT':
            let newObj2 = Object.assign({},state);
            newObj2.count = action.count;
            newObj2.total = action.total;
            // console.log(action.count);
            return newObj2;
        case 'SEARCH_ACCOUNT':
            let newObj3 = Object.assign({},state);
            newObj3.accounts = action.res;
            console.log(action.res);
            return newObj3;
        default:
            return state;
    }
}

//会员数据
const reduceruser = (state={users:[],count:0,total:0},action)=>{
    switch(action.type){
        case 'GET_USER':
            let newObj = Object.assign({},state);
            newObj.users = action.res;
            // console.log(action.res);
            return newObj;
        case 'GET_USER_COUNT':
            let newObj2 = Object.assign({},state);
            newObj2.count = action.count;
            newObj2.total = action.total;
            // console.log(action.count);
            return newObj2;
        case 'SEARCH_USER':
            let newObj3 = Object.assign({},state);
            newObj3.users = action.res;
            console.log(action.res);
            return newObj3;
        default:
            return state;
    }
}

const reducers = combineReducers({
    reducermyarticle,
    reducerapprove,
    reducercolumn,
    reducernews,
    reduceraccount,
    reduceruser
});

export {reducers};