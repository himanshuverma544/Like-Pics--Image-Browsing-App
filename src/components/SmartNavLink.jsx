import { NavLink } from "react-router-dom";

import { useState } from "react";


const SmartNavLink = ({ path, activeIcon, inactiveIcon, title }) => {

  const [isNavActive, setIsNavActive] = useState(false);

  return (
    <li>
      <NavLink
        className = {({ isActive }) =>
          isActive ?
          setIsNavActive(true) :
          setIsNavActive(false)}
        to={path}
      >
        <div className="nav-link-items-cont">
          {isNavActive ? activeIcon : inactiveIcon}
          <span className="ps-1">
            {title}
          </span>
        </div>
      </NavLink>
    </li>
  );
}

export default SmartNavLink;