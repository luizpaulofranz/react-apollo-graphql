import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import SignOut from './Auth/SignOut';

const Navbar = ({session}) => (
    <nav>
        {/* the logic to change menu if user is authenticated, SESSION COMES FROM WithSession Component */}
        { session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}
    </nav>
);

// to authenticated users
const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/search">Search</NavLink></li>
            <li><NavLink to="/recipe/add">Add Recipe</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><SignOut/></li>
        </ul>
        <h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
    </Fragment>
);

// to NOT authenticated users
const NavbarUnAuth = () => (
    <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/signin">SignIn</NavLink></li>
        <li><NavLink to="/signup">SignUp</NavLink></li>
    </ul>
);

export default Navbar;