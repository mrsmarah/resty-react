import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './header.scss';

const Header = () => {
  return (
    <header>
      <h1>RESTy APP</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <NavLink to="/History">History</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
