import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authContext } from '../context/authContext';

const Navbar = () => {
  const context = useContext(authContext);
  const history = useHistory();
  const logoutHandler = (event) => {
    event.preventDefault();
    context.logout();
    history.push('/');
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          Сокращение ссылок
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/create">Создать</Link>
          </li>
          <li>
            <Link to="/links">Ссылки</Link>
          </li>
          <li>
            <a onClick={logoutHandler} href="/">
              Выход
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
