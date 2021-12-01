import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Routes } from 'react-router';
import Main from './pages/main/Main';
import JoinForm from './pages/user/JoinForm';
import LoginForm from './pages/user/LoginForm';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/" exact element={<Main />} />
                        <Route path="/join" element={<JoinForm />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;