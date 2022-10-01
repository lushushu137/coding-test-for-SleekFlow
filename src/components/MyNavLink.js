import React from "react";
import { NavLink } from "react-router-dom";
import "./MyNavLink.css";

const MyNavLink = (props) => {
  return (
    <div className="nav-links">
      <NavLink {...props} />
    </div>
  );
};

export default MyNavLink;
