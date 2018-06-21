export function changeUserStatus(id,status){
    return {
        type:"CHANGE_USER_STATUS",
        id,
        status
    }
}

export function add_num(id){
    return {
        type:"ADD_NUM",
        id
    }
}

export function minus_num(id){
    return {
        type:"MINUS_NUM",
        id
    }
}