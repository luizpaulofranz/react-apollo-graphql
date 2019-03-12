import React from 'react';
import { Link } from 'react-router-dom';

const formatedDate = date => {
    const newDate = new Date(parseInt(date)).toLocaleDateString("en-US");
    const newTime = new Date(parseInt(date)).toLocaleTimeString("en-US");
    return `${newDate} at ${newTime}`;
}

const UserInfo = ({ session }) => (
    <div>
        <h3>User Info</h3>
        <p>Username: {session.getCurrentUser.username}</p>
        <p>Email: {session.getCurrentUser.email}</p>
        <p>Join Date: {formatedDate(session.getCurrentUser.joinDate)}</p>
        <ul>
            <h3>Username: {session.getCurrentUser.username}'s Favorites:</h3>
            {session.getCurrentUser.favorites.map(favorite => (
                <Link to={`/recipes/${favorite._id}`}>
                    <li key={favorite._id}>{favorite.name}</li>
                </Link>
            ))}
            {!session.getCurrentUser.favorites.length && (<p><strong>You have no favorite Recipes, go ahead and add some!</strong></p>)}
        </ul>
    </div>
);

export default UserInfo;