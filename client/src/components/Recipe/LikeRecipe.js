import React from 'react';
import { Mutation } from 'react-apollo';

import withSession from '../withSession';
import { LIKE_RECIPE } from '../../queries/index';

class LikeRecipe extends React.Component {

    state = {
        liked: false,
        username: '',
        email: ''
    }

    componentDidMount() {
        if (this.props.session.getCurrentUser) {
            
            const { username, email, favorites } = this.props.session.getCurrentUser;
            const { _id } = this.props;
            // returns true if this index exists
            const prevLike = (favorites.findIndex(favorite => favorite._id === _id) > -1);
            
            this.setState({ 
                liked: prevLike,
                username, 
                email 
            });
        }
    }

    // to handle like/unlike
    handleClick = (likeRecipe) => {
        this.setState(prevState => ({
            liked: !prevState.liked
        }),
            () => this.handleLike(likeRecipe)
        )
    }

    handleLike = (likeRecipe) => {
        if (this.state.liked) {
            likeRecipe().then( async ({data}) => {
                await this.props.refetch();
            });
        } else {
            console.log('Unlike');
        }
    }

    render() {
        const { username, email, liked } = this.state;
        const { _id } = this.props;

        return (
            <Mutation mutation={LIKE_RECIPE} variables={{_id, email}}>
            { likeRecipe => 
                username && (
                <button onClick={() => this.handleClick(likeRecipe)}>
                    {!liked ? 'Like' : 'Unlike'}
                </button>
            )}
            </Mutation>
        );
    }
}

export default withSession(LikeRecipe);