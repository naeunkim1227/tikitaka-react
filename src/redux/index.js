import React from "react";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";

const test = 100;

const auth = {};

//사용방법
// const test = useSelector( (state) => state)


function reducer(state = test, action){
    return state
}

let store = createStore(reducer)

ReactDOM.render(
    <React.StrictMode>
        <Provider>
            <App/>
        </Provider>
    </React.StrictMode>

)