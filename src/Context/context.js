/* eslint-disable */
import React,{useContext,createContext,useReducer} from "react";
import {AuthReducer,initialState} from './reducer'
import { ChatReducer,init } from '../reducer/ChatReducer'
import { DataReducer,initial } from "src/reducer/DataReducer";


const AuthStateContext = createContext(null) //Auth상태 context객체 생성
const AuthDispatchContext = createContext(null) //Auth디스패치 context객체 생성

const ChatContext = createContext(null)
const ChatStateContext = createContext(null)


const DataContext = createContext(null) //채팅방 메세지 전달 context 객체
const DataStateContext = createContext(null)

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
  
  export function useChatContext() {
    const context = useContext(ChatContext);
    if (context === undefined) {
          throw new Error("MsgContext는 AuthProvider 안에서만 사용 가능합니다.")
    }
    return context;
  }

  export function useChatStateContext() {
    const context = useContext(ChatStateContext);
    if (context === undefined) {
          throw new Error("ChatStateContext는 AuthProvider 안에서만 사용 가능합니다.")
    }
    return context;
  }
  
  
  export function useDataContext() {
    const context = useContext(DataContext);
    if (context === undefined) {
          throw new Error("DataContext는 AuthProvider 안에서만 사용 가능합니다.")
    }
    return context;
  }

  export function useDataStateContext() {
    const context = useContext(DataStateContext);
    if (context === undefined) {
          throw new Error("DataStateContext는 AuthProvider 안에서만 사용 가능합니다.")
    }
    return context;
  }


  export const Context =({children})=>{
  
      const [user,dispatch] = useReducer(AuthReducer,initialState)
      const [msg,chatstate] = useReducer(ChatReducer,init)
      const [data,datastate] = useReducer(DataReducer,initial)
      
      return (
        <AuthStateContext.Provider value={user}>
          <AuthDispatchContext.Provider value={dispatch}>
            <DataContext.Provider value={data}>
              <DataStateContext.Provider value={datastate}>
                <ChatContext.Provider value={msg}>
                  <ChatStateContext.Provider value={chatstate}>
                    {children}
                  </ChatStateContext.Provider>
                </ChatContext.Provider>
              </DataStateContext.Provider>
            </DataContext.Provider>
          </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
      );
  }