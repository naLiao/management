 /*
 渲染流程：
 获取6条新闻
 获取页码
 */
 //新闻管理-获取数据-操作发起
 export function getNewsData(column,num){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/news/getlist?column=${column}&page=${num}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getData(res));
            console.log(res);
        })
    }
}
function getData(res){
    return {
        type:'GET_DATA',
        res
    }
}

//新闻管理-获取页码
export function getCount(column){
    return (dispatch)=>{
        fetch('http://127.0.0.1:88/api/news/getcount?column='+column)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getcount(res.count));
            console.log(res.count);
        })
    }
}
function getcount(count){
    return {
        type:'GET_COUNT',
        count
    }
}
 
 //新闻管理-添加数据-操作发起
export function addnews(obj,status){
    return (dispatch,getState)=>{
        Object.assign(obj,{status});
        console.log(obj);
        
        console.log('新闻管理-添加数据-操作发起');
        fetch('http://127.0.0.1:88/api/news/add',{
            method:"post",
            body :new URLSearchParams(obj).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(e=>e.json())
        .then(data => {
            console.log(data);
            if(data.code===0){
                console.log('添加成功');
                // dispatch(addSuccess());
            }else if(data.code===-1){
                console.log('添加失败');
                // dispatch(addFail());
            }
        })
    }
}
//新闻管理-添加数据-操作成功
export function addSuccess(){
    return {
        type:'ADD_SUCCESS'
    }
}
//新闻管理-添加数据-操作失败
export function addFail(){
    return {
        type:'ADD_FAIL'
    }
}

//新闻管理-删除数据-操作发起
export function delNewsData(id,currentPage){
    return (dispatch)=>{
        console.log('action新闻管理-删除数据，id：'+id);
        fetch('http://localhost:88/api/news/del?id='+id)
        .then(e=>e.json())
        .then(res=>{
            console.log(res.msg);
            // dispatch(delNews(currentPage));
        })
    }
}

//新闻管理-修改数据-操作发起
export function editNewsData(id,obj,status){
    return (dispatch,getState)=>{
        console.log('action新闻管理-修改数据，id：'+id);
        Object.assign(obj,{status,id});
        
        fetch('http://127.0.0.1:88/api/news/edit',{
            method:"post",
            body :new URLSearchParams(obj).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(e=>e.json())
        .then(data => {
            console.log(data);
            if(data.code===0){
                console.log('添加成功');
                dispatch(addSuccess());
            }else if(data.code===-1){
                console.log('添加失败');
                dispatch(addFail());
            }
        })
    }
}

//------------------------------------------------------------------------------------

//栏目管理-获取数据-操作发起
export function getColumnData(num){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/column/getcol?page=`+num)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getColumnSuccess(res));
            console.log(res);
        })
    }
}
function getColumnSuccess(res){
    return {
        type:'GET_COLUMN',
        res
    }
}

//栏目管理-获取页码
export function getColCount(){
    return (dispatch)=>{
        fetch('http://127.0.0.1:88/api/column/getcolcount')
        .then(e=>e.json())
        .then(res=>{
            dispatch(getcolcount(res.count));
            console.log(res.count);
        })
    }
}
function getcolcount(count){
    return {
        type:'GET_COL_COUNT',
        count
    }
}

//栏目管理-添加数据-操作发起
export function addColumn(obj){
    return (dispatch,getState)=>{
        console.log('栏目管理-添加数据-操作发起');
        fetch('http://127.0.0.1:88/api/column/add',{
            method:"post",
            body :new URLSearchParams(obj).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(e=>e.json())
        .then(data => {
            console.log(data);
            if(data.code===0){
                console.log('添加成功');
                // dispatch(addColSuccess());
            }else if(data.code===-1){
                console.log('添加失败');
                // dispatch(addColFail());
            }
        })
    }
}
//栏目管理-添加数据-操作成功
export function addColSuccess(){
    return {
        type:'Add_COL_SUCCESS'
    }
}
//栏目管理-添加数据-操作失败
export function addColFail(){
    return {
        type:'ADD_FAIL'
    }
}

//栏目管理-删除数据-操作发起
export function delColData(id,currentPage){
    return (dispatch)=>{
        console.log('action新闻管理-删除数据，id：'+id);
        fetch('http://localhost:88/api/column/del?id='+id)
        .then(e=>e.json())
        .then(res=>{
            console.log(res);
        })
    }
}

//栏目管理-修改数据-操作发起
export function editColumnData(id,obj){
    return (dispatch)=>{
        console.log('action栏目管理-修改数据，id：'+id);
        fetch('http://127.0.0.1:88/api/column/edit',{
            method:"post",
            body :new URLSearchParams(obj).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(e=>e.json())
        .then(data => {
            console.log(data);
            if(data.code===0){
                console.log('修改成功');
            }else if(data.code===-1){
                console.log('修改失败');
            }
        })
    }
}

//------------------------------------------------------------------------------------

//账户管理-获取用户信息-操作发起
export function getAccDetail(name){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/account/detail?name=`+name)
        .then(e=>e.json())
        .then(res=>{
            // dispatch(getAccDetailSuccess(res));
            console.log(res);
        })
    }
}
// function getAccDetailSuccess(res){
//     return {
//         type:'GET_ACCOUNT',
//         res
//     }
// }

//账户管理-获取数据-操作发起
export function getAccountData(num){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/account/getlist?page=`+num)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getAccountSuccess(res));
            // console.log(res);
        })
    }
}
function getAccountSuccess(res){
    return {
        type:'GET_ACCOUNT',
        res
    }
}

//账户管理-获取页码
export function getAccountCount(){
    return (dispatch)=>{
        fetch('http://127.0.0.1:88/api/account/getcount')
        .then(e=>e.json())
        .then(res=>{
            dispatch(getacccount(res.count));
            console.log(res.count);
        })
    }
}
function getacccount(count){
    return {
        type:'GET_ACC_COUNT',
        count
    }
}

//账户管理-添加数据-操作发起
export function addAccount(obj){
    return (dispatch,getState)=>{
        console.log('账户管理-添加数据-操作发起');
        fetch('http://127.0.0.1:88/api/account/add',{
            method:"post",
            body :new URLSearchParams(obj).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(e=>e.json())
        .then(data => {
            console.log(data);
            if(data.code===0){
                console.log('添加成功');
                // dispatch(addAccSuccess());
            }else if(data.code===-1){
                console.log('添加失败');
                // dispatch(addColFail());
            }
        })
    }
}
//账户管理-添加数据-操作成功
export function addAccSuccess(){
    return {
        type:'ADD_ACC_SUCCESS'
    }
}
//账户管理-添加数据-操作失败
export function addAccFail(){
    return {
        type:'ADD_ACC_FAIL'
    }
}

//账户管理-删除数据-操作发起
export function delAccData(id){
    return (dispatch)=>{
        console.log('action账户管理-删除数据，id：'+id);
        fetch('http://localhost:88/api/account/del?id='+id)
        .then(e=>e.json())
        .then(res=>{
            console.log(res);
        })
    }
}

//账户管理-修改数据-操作发起/account/edit
export function editAccData(id,obj){
    return (dispatch)=>{
        obj.id=id;
        console.log(obj);
        
        fetch('http://127.0.0.1:88/api/account/edit',{
            method:"post",
            body :new URLSearchParams(obj).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(e=>e.json())
        .then(data => {
            console.log(data);
            if(data.code===0){
                console.log('成功');
            }else if(data.code===-1){
                console.log('修改失败');
            }
        })
    }
}

//------------------------------------------------------------------------------------------

//已审核-获取数据-操作发起
export function getApproveData(name,num){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/approve/getlist?name=${name}&page=${num}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getApproveSuccess(res));
            // console.log(res);
        })
    }
}
function getApproveSuccess(res){
    return {
        type:'GET_APPROVE',
        res
    }
}
//已审核-获取页码
export function getAppCount(name){
    return (dispatch)=>{
        fetch('http://127.0.0.1:88/api/approve/getcount?name='+name)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getappcountsuccess(res.total,res.count));
            // console.log(res);
        })
    }
}
function getappcountsuccess(total,count){
    return {
        type:'GET_APP_COUNT',
        total,
        count
    }
}
//已审核-发布稿件-操作发起
export function approveArticle(id){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/approve?id=`+id)
        .then(e=>e.json())
        .then(res=>{
            // dispatch(approveArticleSuccess(res));
            console.log(res);
        })
    }
}

//--------------------------------------------------------------------------------------------

//我的-获取数据-操作发起
export function getMyData(name,num){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/my/getlist?name=${name}&page=${num}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getMySuccess(res));
            // console.log(res);
        })
    }
}
function getMySuccess(res){
    return {
        type:'GET_MY',
        res
    }
}
//我的-获取页码
export function getMyCount(name){
    return (dispatch)=>{
        fetch('http://127.0.0.1:88/api/my/getcount?name='+name)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getmycountsuccess(res.total,res.count));
            console.log(res);
        })
    }
}
function getmycountsuccess(total,count){
    return {
        type:'GET_MY_COUNT',
        total,
        count
    }
}
