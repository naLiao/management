import {combineReducers} from 'redux';

//1.新闻管理
const reducernews = (state={news:[],count:0},action)=>{
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
            return newObj2;
        default:
            return state;
    }
}

//2.栏目数据
const reducercolumn = (state={columns:[],count:0},action)=>{
    switch(action.type){
        case 'GET_COLUMN':
            let newObj = Object.assign({},state);
            newObj.columns = action.res;
            // console.log(action.res);
            return newObj;
        case 'GET_COL_COUNT':
            let newObj2 = Object.assign({},state);
            newObj2.count = action.count;
            // console.log(action.count);
            return newObj2;
        default:
            return state;
    }
}

//3.我的稿件数据，根据登录账号动态获取
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

//4.我的待审核稿件数据
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

//5.账户数据
const reduceraccount = (state={accounts:[],count:0},action)=>{
    switch(action.type){
        case 'GET_ACCOUNT':
            let newObj = Object.assign({},state);
            newObj.accounts = action.res;
            // console.log(action.res);
            return newObj;
        case 'GET_ACC_COUNT':
            let newObj2 = Object.assign({},state);
            newObj2.count = action.count;
            // console.log(action.count);
            return newObj2;
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
    reduceraccount,
    reducer3
});

export {reducers};