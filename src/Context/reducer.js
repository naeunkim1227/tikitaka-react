/* eslint-disable */

//sessionStorage.clear();
let token = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').no : '';
let name = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').name : '';
let password = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').password : '';
let email = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').email : '';
let profile = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').profile : '';
let phone = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').phone : '';
let status = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').status : '';
let message = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').message : '';
let chatNo = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').chatNo : '';
let title = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').title : '';
let role = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').role : '';

export const initialState ={ //초기값 설정
    token:""||token,
    name:""||name,
    password:""||password,
    email:""||email,
    profile:""||profile,
    phone:""||phone,
    status:""||status,
    message:""||message,
    chatNo:""||chatNo,
    title:""||title,
    role: ""||role
    // loading:false,
    // errorMessage:null
}

export const AuthReducer =(initialState,action)=>{  //action타입에 따라 값들 반환
    switch (action.type){
        case 'LOGIN_SUCCESS':
            // console.log("reducer",initialState.token);
            // console.log("reducer",initialState.name);
            // console.log("reducer",initialState.password);
            // console.log("reducer",initialState.email);
            // console.log("reducer",initialState.profile);

            return{
                ...initialState,
                token:action.payload.no,
                name:action.payload.name,
                password:action.payload.password,
                email:action.payload.email,
                profile:action.payload.profile,
                phone:action.payload.phone,
                status:action.payload.status,
                role:action.payload.role
                //loading: false
            }
        case 'LOGOUT':
            return{
                ...initialState,
                token:'',
                name:'',
                password:'',
                email:'',
                profile:'',
                phone:'',
                status:''
            }
        case 'LOGIN_ERROR':
            return{
                ...initialState,
                loading: false,
                errorMessage: action.error
            }
        case 'SEND_MESSAGE':
            return{
                ...initialState,
                message: action.target.value
            }
        case 'STORE_CHATNO':
            return{
                ...initialState,
                title: action.payload.title,
                chatNo: action.payload.chatNo,
            }
        case 'CHANGE_PROFILE':
            return{
                ...initialState,
                profile: action.payload
            }
        case 'NULL_CHATNO':
            return{
                ...initialState,
                chatNo: ''
            }
        default:
            throw new Error( `Unhandled action type: ${action.type}`)
    }
}