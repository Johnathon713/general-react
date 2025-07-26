import {NavLink} from "react-router-dom";
import React from "react";

const Home = () => {
  return (<div>
    <NavLink to="/management">管理台</NavLink>
    <NavLink to="/login">登录</NavLink>
  </div>)
}
export default Home
