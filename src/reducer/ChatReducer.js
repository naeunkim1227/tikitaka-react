/* eslint-disable */

let email =sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').email : '' ;
let login_time= sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').login_time :'';
let logout_time = sessionStorage.getItem('chatMessage')? sessionStorage.getItem('chatMessage').logout_time : '';
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
    login_time: "" || login_time,
    logout_time: "" || logout_time,
    name: "" || name,
    no:  "" || no,
    phone: ""  || phone,
    proName: ""  || proName,
    profile:  "" || profile,
    role:  "" || role,
    status: "" || status,
    careNo: "" || careNo
}




export const ChatReducer = (init,action) => {
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
        console.log('>>>>>>> STORE_INFO', action.chatdata[0]);
        console.log('>>>>>>> STORE_INFO', action.chatdata[0].email);
        console.log('>>>>>>> STORE_INFO', action.chatdata[0].profile);

             return{
                ...init,
                careNo: action.chatdata[0].careNo,
                email: action.chatdata[0].email,
                login_time: action.chatdata[0].login_time,
                logout_time: action.chatdata[0].logout_time,
                name: action.chatdata[0].name,
                no:  action.chatdata[0].no,
                phone: action.chatdata[0].phone,
                proName: action.chatdata[0].proName,
                profile:  action.chatdata[0].profile,
                role:  action.chatdata[0].role,
                status: action.chatdata[0].status

             }
             
        
    }
}