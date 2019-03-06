import React from 'react';

import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import withAuth from '../withAuth';

const Profile = ({ session }) => (
    <div className="App">
        <UserInfo session={session} />
        <UserRecipes username={session.getCurrentUser.username} />
    </div>
);
// withAuth expects a function to check if the user is authenticated
// session came from index, from App component as a prop
export default withAuth(session => session && session.getCurrentUser)(Profile);