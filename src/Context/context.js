/* eslint-disable */
import React,{useContext,createContext,useReducer} from "react";
import {AuthReducer,initialState} from './reducer'

const AuthStateContext = createContext(null) //Auth상태 context객체 생성
const AuthDispatchContext = createContext(null) //Auth디스패치 context객체 생성

export function useAuthState() {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
      throw new Error("useAuthState는 AuthProvider 안에서만 사용 가능합니다.")
    }
   
    return context;
  }
   
  export function useAuthDispatch() {
    const context = useContext(AuthDispatchContext);
    if (context === undefined) {
          throw new Error("useAuthDispatch는 AuthProvider 안에서만 사용 가능합니다.")
    }
   
    return context;
  }
  
  export const Context =({children})=>{
      const [user,dispatch] = useReducer(AuthReducer,initialState)
  
      return(
          <AuthStateContext.Provider value={user}>
              <AuthDispatchContext.Provider value={dispatch}>
                  {children}
              </AuthDispatchContext.Provider>
          </AuthStateContext.Provider>
      )
  }