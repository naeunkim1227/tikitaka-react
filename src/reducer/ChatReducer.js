/* eslint-disable */

let email =sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').email : '' ;
let loginTime = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').loginTime :'';
let logoutTime = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').logoutTime : '';
let name = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').name : '';
let no = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').no : '';
let readCount = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').readCount : '';
let phone = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').phone : '';
let proName = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').proName : '';
let profile = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').profile : '';
let role = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').role : '';
let status = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').status : '';
let careNo = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').careNo : '';


export const init = {
    email: "" || email,
    loginTime: "" || loginTime,
    logoutTime: "" || logoutTime,
    name: "" || name,
    no:  "" || no,
    phone: ""  || phone,
    proName: ""  || proName,
    profile:  "" || profile,
    role:  "" || role,
    status: "" || status,
    careNo: "" || careNo
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
        console.log('>>>>>>> STORE_INFO')
        console.log('>>>>>>> STORE_INFO', action.chatdata);

             return{
                ...init,
                careNo: action.chatdata.careNo,
                email: action.chatdata.email,
                loginTime: action.chatdata.loginTime,
                logoutTime: action.chatdata.logoutTime,
                name: action.chatdata.name,
                no:  action.chatdata.no,
                phone: action.chatdata.phone,
                proName: action.chatdata.proName,
                profile:  action.chatdata.profile,
                role:  action.chatdata.role,
                status: action.chatdata.status

             }
            default : 
            throw new Error(`명시 되지 않은 Action :  ${action.type}`)

    }
}