import React from 'react';
import { Mutation } from 'react-apollo';

import withSession from '../withSession';
import { LIKE_RECIPE } from '../../queries/index';

class LikeRecipe extends React.Component {

    state = {
        username: '',
        email: ''
    }

    componentDidMount() {
        if (this.props.session.getCurrentUser) {
            const { username, email } = this.props.session.getCurrentUser;
            console.log(email);
            this.setState({ username, email });
        }
    }

    handleLike = (likeRecipe) => {
        likeRecipe().then( ({data}) => {

        })
    }

    render() {
        const { username, email } = this.state;
        const { _id } = this.props;

        return (
            <Mutation mutation={LIKE_RECIPE} variables={{_id, email}}>
            { likeRecipe => (
                username && <button onClick={() => this.handleLike(likeRecipe)}>Like</button>
            )}
            </Mutation>
        );
    }
}

export default withSession(LikeRecipe);