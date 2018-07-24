 /*
 渲染流程：
 获取6条新闻
 获取页码
 */
 //新闻管理-获取数据-操作发起
export function getNewsData(num){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/news/getlist?page=${num}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getData(res));
            // console.log(res);
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
export function getCount(searchName,searchColumn){
//  console.log(searchName,searchColumn);
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/news/getcount?title=${searchName}&column=${searchColumn}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getcount(res.count,res.total));
            // console.log(res.count);
        })
    }
}
function getcount(count,total){
    return {
        type:'GET_COUNT',
        total,
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
export function delNewsData(ids){
    return (dispatch)=>{
        console.log('action新闻管理-删除数据，ids：'+ids);
        fetch('http://localhost:88/api/news/del?ids='+ids)
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

//新闻管理-查询数据-操作发起
export function searchNewsData(num,searchName,searchColumn){
    return (dispatch)=>{
        // console.log(num,searchName,searchColumn);
        fetch(`http://127.0.0.1:88/api/news/search?page=${num}&title=${searchName}&column=${searchColumn}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(searchNewsSuccess(res));
            console.log(res);
        })
    }
}
function searchNewsSuccess(res){
    return {
        type:'SEARCH_NEWS',
        res
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
            // console.log(res);
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
export function getColCount(searchName){
    return (dispatch)=>{
        fetch('http://127.0.0.1:88/api/column/getcolcount?column='+searchName)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getcolcount(res.count,res.total));
            // console.log(res.count);
        })
    }
}
function getcolcount(count,total){
    return {
        type:'GET_COL_COUNT',
        total,
        count
    }
}

//栏目管理-查询数据-操作发起
export function searchColumnData(num,searchName){
    return (dispatch)=>{
        console.log(num,searchName);
        fetch(`http://127.0.0.1:88/api/column/search?page=${num}&column=${searchName}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(searchColumnSuccess(res));
            console.log(res);
        })
    }
}
function searchColumnSuccess(res){
    return {
        type:'SEARCH_COLUMN',
        res
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
export function delColData(ids,currentPage){
    return (dispatch)=>{
        console.log('action新闻管理-删除数据，ids：'+ids);
        fetch('http://localhost:88/api/column/del?ids='+ids)
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
        fetch(`http://127.0.0.1:88/api/account/getlist?page=${num}`)
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
export function getAccountCount(searchName,searchKind){
    // console.log(searchName,searchKind);
    
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/account/getcount?account=${searchName}&kind=${searchKind}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getacccount(res.count,res.total));
            // console.log(res.count);
        })
    }
}
function getacccount(count,total){
    return {
        type:'GET_ACC_COUNT',
        total,
        count
    }
}

//账户管理-查询数据-操作发起
export function searchAccountData(num,searchName,searchKind){
    return (dispatch)=>{
        console.log(num,searchName,searchKind);
        fetch(`http://127.0.0.1:88/api/account/search?page=${num}&account=${searchName}&kind=${searchKind}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(searchAccountSuccess(res));
            console.log(res);
        })
    }
}
function searchAccountSuccess(res){
    return {
        type:'SEARCH_ACCOUNT',
        res
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
export function delAccData(ids){
    return (dispatch)=>{
        console.log('action账户管理-删除数据，id：'+ids);
        fetch('http://localhost:88/api/account/del?ids='+ids)
        .then(e=>e.json())
        .then(res=>{
            console.log(res);
        })
    }
}

//账户管理-修改数据-操作发起
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
export function getApproveData(num,name){
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
export function getAppCount(name,searchName,searchColumn){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/approve/getcount?name=${name}&title=${searchName}&column=${searchColumn}`)
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
//已审核-查询数据-操作发起
export function searchApproveData(num,name,searchName,searchColumn){
    return (dispatch)=>{
        console.log(num,searchName,searchColumn);
        fetch(`http://127.0.0.1:88/api/approve/search?page=${num}&name=${name}&title=${searchName}&column=${searchColumn}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(searchApproveSuccess(res));
            console.log(res);
        })
    }
}
function searchApproveSuccess(res){
    return {
        type:'SEARCH_APPROVE',
        res
    }
}

//--------------------------------------------------------------------------------------------

//我的-获取数据-操作发起
export function getMyData(num,name){
    // console.log(num,name);
    
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
export function getMyCount(name,searchName,searchColumn){
    // console.log(name,searchName,searchColumn);
    
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/my/getcount?name=${name}&title=${searchName}&column=${searchColumn}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getmycountsuccess(res.total,res.count));
            // console.log(res);
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
//我的-查询数据-操作发起
export function searchMyData(num,name,searchName,searchColumn){
    return (dispatch)=>{
        console.log(num,searchName,searchColumn);
        fetch(`http://127.0.0.1:88/api/my/search?page=${num}&name=${name}&title=${searchName}&column=${searchColumn}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(searchMySuccess(res));
            console.log(res);
        })
    }
}
function searchMySuccess(res){
    return {
        type:'SEARCH_MY',
        res
    }
}

//--------------------------------------------------------------------------------------

//会员管理-获取用户信息-操作发起
export function getUserDetail(name){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/account/detail?name=`+name)
        .then(e=>e.json())
        .then(res=>{
            // dispatch(getAccDetailSuccess(res));
            console.log(res);
        })
    }
}

//会员管理-获取数据-操作发起
export function getUserData(num){
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/user/getlist?page=${num}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getUserSuccess(res));
            // console.log(res);
        })
    }
}
function getUserSuccess(res){
    return {
        type:'GET_USER',
        res
    }
}

//会员管理-获取页码
export function getUserCount(searchName){
    // console.log(searchName);
    
    return (dispatch)=>{
        fetch(`http://127.0.0.1:88/api/user/getcount?username=${searchName}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(getuser(res.count,res.total));
            // console.log(res.count);
        })
    }
}
function getuser(count,total){
    return {
        type:'GET_USER_COUNT',
        total,
        count
    }
}

//会员管理-查询数据-操作发起
export function searchUserData(num,searchName){
    return (dispatch)=>{
        console.log(num,searchName);
        fetch(`http://127.0.0.1:88/api/user/searchname?page=${num}&username=${searchName}`)
        .then(e=>e.json())
        .then(res=>{
            dispatch(searchUserSuccess(res));
            console.log(res);
        })
    }
}
function searchUserSuccess(res){
    return {
        type:'SEARCH_USER',
        res
    }
}

//会员管理-删除数据-操作发起
export function delUserData(ids){
    return (dispatch)=>{
        console.log('action会员管理-删除数据，id：'+ids);
        fetch('http://localhost:88/api/user/del?ids='+ids)
        .then(e=>e.json())
        .then(res=>{
            console.log(res);
        })
    }
}

//会员管理-修改数据-操作发起
export function editUserData(id,status){
    return (dispatch)=>{
        
        fetch('http://127.0.0.1:88/api/user/edit',{
            method:"post",
            body :new URLSearchParams({id,status}).toString(),
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