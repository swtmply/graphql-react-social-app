import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts";

import "../../styles/nav.scss";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  if (user === null) {
    return null;
  } else {
    return (
      <div className="nav__container">
        <nav>
          <ul className="nav_links">
            {user.role === "user" ? (
              <>
                <h2 className="nav_brand">Eric</h2>
                <li className="nav_item">
                  <Link to="/dashboard">
                    <p>Home</p>
                  </Link>
                </li>
                <li className="nav_item">
                  <button onClick={() => logout()}>Logout</button>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </div>
    );
  }
};

export default Nav;
