import React from "react";
import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h1>Main 페이지입니다.</h1>
      <h1><NavLink to="/join">Join</NavLink></h1>
      <h1><NavLink to="/login">Login</NavLink></h1>
    </div>
  );
};

export default Main;
