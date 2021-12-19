/* eslint-disable */

let userNo = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').userNo : '';
let name = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').name : '';
let chatNo = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').chatNo : '';
let contents = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').contents : '';
let type = sessionStorage.getItem('chatMessage') ? sessionStorage.getItem('chatMessage').type : '';
let regTime= sessionStorage.getItem('chatMessage') ? sessionStorage.getItem('chatMessage').regTime : '';
let readCount = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').readCount : '';

export const init = {
    userNo: "" || userNo,
    name: "" || name,
    chatNo: "" || chatNo,
    contents: "" || contents,
    type: "" || type,
    regTime: "" || regTime,
    readCount: "" || readCount
 

}




export const MessgeReducer = (init,action) => {
    switch (action.type){
        case 'VIEW_MESSAGE' :
            console.log('데이터 받아 오나요??' , action.chatdata);
            return{
                 ...init,
                 userNo: action.chatdata.userNo ,
                 name: action.chatdata.name ,
                 chatNo: action.chatdata.chatNo, 
                 contents: action.chatdata.contents, 
                 type: action.chatdata.type ,
                 regTime: action.chatdata.regTime,
                 readCount: action.chatdata.readCount 
                 
             }
        case 'CHATUSER__INFO' : 
             return{




             }
            default : 
            throw new Error(`명시 되지 않은 Action :  ${action.type}`)

    }
}