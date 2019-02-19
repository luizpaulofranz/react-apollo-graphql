import React from 'react';
import { NavLink } from 'react-router-dom'

const Navbar = () => (
    <nav>
        <NavbarAuth />
    </nav>
);

// to authenticated users
const NavbarAuth = () => (
    <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/recipe/add">Add Recipe</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><button>SignOut</button></li>
    </ul>
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