/* eslint-disable */

//sessionStorage.clear();
let token = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').no : '';
let name = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').name : '';
let password = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').password : '';
let email = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').email : '';
let profile = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').profile : '';
let phone = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').phone : '';
let status = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').status : '';

export const initialState ={ //초기값 설정
    token:""||token,
    name:""||name,
    password:""||password,
    email:""||email,
    profile:""||profile,
    phone:""||phone,
    status:""||status
    // loading:false,
    // errorMessage:null
}

export const AuthReducer =(initialState,action)=>{  //action타입에 따라 값들 반환
    switch (action.type){
        case 'LOGIN_SUCCESS':
            console.log("reducer",initialState.token);
            console.log("reducer",initialState.name);
            console.log("reducer",initialState.password);
            console.log("reducer",initialState.email);
            console.log("reducer",initialState.profile);
            console.log("reducer",initialState.status);
            return{
                ...initialState,
                token:action.payload.no,
                name:action.payload.name,
                password:action.payload.password,
                email:action.payload.email,
                profile:action.payload.profile,
                phone:action.payload.phone,
                status:action.payload.status
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
        default:
            throw new Error( `Unhandled action type: ${action.type}`)
    }
}