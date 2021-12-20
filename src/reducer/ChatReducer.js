/* eslint-disable */

import { phone } from "faker";

let userNo = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').userNo : '';
let name = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').name : '';
let chatNo = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').chatNo : '';
let contents = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').contents : '';
let type = sessionStorage.getItem('chatMessage') ? sessionStorage.getItem('chatMessage').type : '';
let regTime= sessionStorage.getItem('chatMessage') ? sessionStorage.getItem('chatMessage').regTime : '';
let readCount = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').readCount : '';

export const init = {
    // email: "" || email,
    // loginTime: "" || loginTime,
    // logoutTime: "" || logoutTime,
    // name: "" || name,
    // no:  "" || no,
    // password:  "" ,
    // phone: ""  || phone,
    // proName: ""  || proName,
    // profile:  "" || profile,
    // role:  "" || role,
    // status: "" || status
}




export const MessgeReducer = (init,action) => {
    switch (action.type){
        // case 'VIEW_MESSAGE' :
        //     console.log('VIEW_MESSAGE >>>>> ' , action.chatdata);
        //     return{
        //          ...init,
        //          userNo: action.chatdata.userNo ,
        //          name: action.chatdata.name ,
        //          chatNo: action.chatdata.chatNo, 
        //          contents: action.chatdata.contents, 
        //          type: action.chatdata.type ,
        //          regTime: action.chatdata.regTime,
        //          readCount: action.chatdata.readCount 
                 
        //      }
        case 'STORE_INFO' : 
        console.log('>>>>>>> RESET_MESSAGE')
             return{
                // ...init,
                // careNo: action.chatdata.careNo,
                // email: action.chatdata.email,
                // loginTime: action.chatdata.loginTime,
                // logoutTime: action.chatdata.logoutTime,
                // name: action.chatdata.name,
                // no:  action.chatdata.no,
                // password:  "",
                // phone: action.chatdata.phone,
                // proName: action.chatdata.proName,
                // profile:  action.chatdata.profile,
                // role:  action.chatdata.role,
                // status: action.chatdata.status

             }
            default : 
            throw new Error(`명시 되지 않은 Action :  ${action.type}`)

    }
}