import React from 'react';
import { Mutation } from 'react-apollo';

import withSession from '../withSession';
import { LIKE_RECIPE, GET_RECIPE, UNLIKE_RECIPE } from '../../queries/index';

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
    handleClick = (likeRecipe, unlikeRecipe) => {
        this.setState(prevState => ({
            liked: !prevState.liked
        }),
            () => this.handleLike(likeRecipe, unlikeRecipe)
        )
    }

    handleLike = (likeRecipe, unlikeRecipe) => {
        if (this.state.liked) {
            likeRecipe().then( async ({data}) => {
                await this.props.refetch();
            });
        } else {
            unlikeRecipe().then( async ({data}) => {
                await this.props.refetch();
            });
        }
    }

    // optimistic UI to atualiza like
    updateLike = (cache, { data: {likeRecipe}} ) => {
        const { _id } = this.props;
        const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: {_id} });

        cache.writeQuery({
            query: GET_RECIPE,
            variables: { _id },
            data: {
                getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1}
            }
        })
    }

    updateUnlike = (cache, { data: {unlikeRecipe}} ) => {
        const { _id } = this.props;
        const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: {_id} });

        cache.writeQuery({
            query: GET_RECIPE,
            variables: { _id },
            data: {
                getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1}
            }
        })
    }

    render() {
        const { username, email, liked } = this.state;
        const { _id } = this.props;

        return (
            <Mutation mutation={UNLIKE_RECIPE} variables={{_id, email}} update={this.updateUnlike}>
            {unlikeRecipe => (
                <Mutation 
                    mutation={LIKE_RECIPE} 
                    variables={{_id, email}}
                    update={this.updateLike}
                >
                    {/* we pass both mutation functions to handle click */}
                    { likeRecipe => 
                        username && ( 
                        <button onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}>
                            {!liked ? 'Like' : 'Unlike'}
                        </button>
                    )}
                </Mutation>
            )}
            </Mutation>
        );
    }
}

export default withSession(LikeRecipe);