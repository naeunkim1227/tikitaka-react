import React from "react";


const App = function(){
    //const app = document.createElement('h1');
    //app.textContent = 'Hellooo world3 ';
    const app = React.createElement('h1', null, 'Hello React!');

    return app;
}

export {App}