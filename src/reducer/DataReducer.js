/* eslint-disable */
let chatNo = sessionStorage.getItem('Data')? sessionStorage.getItem('Data').chatNo : '' ;
let contents = sessionStorage.getItem('Data')? sessionStorage.getItem('Data').contents : '';
let name = sessionStorage.getItem('Data')? sessionStorage.getItem('Data').name : '';
let readCount  = sessionStorage.getItem('Data')? sessionStorage.getItem('Data').readCount : '';
let regTime = sessionStorage.getItem('Data')? sessionStorage.getItem('Data').regTime : '';
let type = sessionStorage.getItem('Data')? sessionStorage.getItem('Data').type : '';
let userNo =sessionStorage.getItem('Data')? sessionStorage.getItem('Data').userNo : '';


export const initial = {
    chatNo: "" || chatNo,
    contents: "" || contents,
    name: "" || name, 
    readCount: "" || readCount,
    regTime: "" || regTime,
    type: "" || type,
    userNo: "" || userNo
}

export const DataReducer = (initial, action) => {

    switch (action.type){
        case 'STORE_MESSAGE' : 
        console.log('STORE_MESSAGE', action.data)

        return {
            ...initial,
            chatNo: action.data.chatNo,
            contents: action.data.contents,
            name: action.data.name,
            readCount: action.data.readCount,
            regTime: action.data.regTime,
            type: action.data.type,
            userNo: action.data.userNo
        }
        default : 
        throw new Error(`명시 되지 않은 Action :  ${action.type}`)




    }
}