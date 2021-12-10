/* eslint-disable */

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
        if(response.status === 200){
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

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
}