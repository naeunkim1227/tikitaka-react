/* eslint-disable */

import { Iron } from "@mui/icons-material";

export const loginUser=async (dispatch,loginPayload)=>{
    try{
        const response = await fetch('/TT/login',{
            method: "post",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(
                loginPayload )
        }).then(response =>{
            if(!response.ok){
                console.log("fail");
            }else{
                return response.json();
            }
        });
        console.log("action called", response.data);
        if(response.result === "success"){
            console.log("acton-loginsuccess 실행");
            dispatch({type:'LOGIN_SUCCESS',payload: response.data})
            sessionStorage.setItem('currentUser',response.data)
            return response.data;
        }
        
        dispatch({type:'LOGIN_ERROR',error:response.result})
        return ;

    }catch (error){
        dispatch({type:'LOGIN_ERROR',error: error})
        console.log(error);
    }
}

export const logout = async (dispatch,data) =>  {
    console.log('logout 메서드 실행');

    try{
        const res = await fetch(`/TT/logout`,{
            method: 'post',
            headers : {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }) 

        const json = await res.json();
        console.log('json data 받아오기! ', json.result);


        if(!res.ok){
            throw new Error(`${response.status} ${response.statusText}`)
        }
        
        if(json.result !== 'success2'){
            throw json.message;
        }
        
        if(json.result == 'success2'){
            dispatch({ type: 'LOGOUT' });
            sessionStorage.removeItem('currentUser');
            sessionStorage.removeItem('token');
        }

    }catch(err){
        throw console.log(`logout error:`, err);
    }


}