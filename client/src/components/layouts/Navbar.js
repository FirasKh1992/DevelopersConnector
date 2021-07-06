import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCode, faUser,faSignOutAlt,faUserPlus, faLaptopCode, faSignInAlt} from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
         
          <FontAwesomeIcon icon={faUser} />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='!#'>
        <FontAwesomeIcon icon={faSignOutAlt} />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const questLinks = (
    <ul>
      <li>
      <FontAwesomeIcon icon={faLaptopCode} />{' '}
        <Link to='/profile'>Developers</Link>
      </li>
      <li>
      <FontAwesomeIcon icon={faUserPlus} />{' '}
        <Link to='/register'>Register</Link>
      </li>
      <li>
      <FontAwesomeIcon icon={faSignInAlt} />{' '}
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
        <FontAwesomeIcon icon={faCode} />{' '} DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : questLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
