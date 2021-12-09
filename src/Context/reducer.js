/* eslint-disable */

//localStorage.clear();
//localStorage는 clear안하면 리액트의 뷰가 안그려지는 문제 때문에 
//localStorage을 sessionStorage으로 전부다 변경

//sessionStorage.clear();
let token = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').no : '';
let user = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').name : '';
let password = sessionStorage.getItem('currentUser')? sessionStorage.getItem('currentUser').password : '';

export const initialState ={
    token:""||token,
    user:""||user,
    password:""||password,
    loading:false,
    errorMessage:null
}

export const AuthReducer =(initialState,action)=>{
    switch (action.type){
        case 'REQUEST_LOGIN':
            return{
                ...initialState,
                loading: true
            }
        case 'LOGIN_SUCCESS':
            console.log("reducer",initialState.token);
            console.log("reducer",initialState.user);
            console.log("reducer",initialState.password);
            return{
                ...initialState,
                token:action.payload.no,
                user:action.payload.name,
                password:action.payload.password,
                loading: false
            }
        case 'LOGOUT':
            return{
                ...initialState,
                user:'',
                token:''
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