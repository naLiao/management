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
            console.log(res);
            dispatch(getData(res));
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
export function addnews(obj){
    return (dispatch,getState)=>{
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
                dispatch(addSuccess());
            }else if(data.code===-1){
                console.log('添加失败');
                dispatch(addFail());
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
    return (dispatch,getState)=>{
        console.log('action新闻管理-删除数据，id：'+id);
        fetch('http://localhost:88/api/news/del?id='+id,{
            method:"get"
        })
        .then(e=>e.json())
        .then(res=>{
            console.log(res.msg);
            dispatch(getNewsData(currentPage));
        })
    }
}

//新闻管理-修改数据-操作发起
export function editNewsData(id,obj){
    return (dispatch,getState)=>{
        console.log('action新闻管理-修改数据，id：'+id);
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
