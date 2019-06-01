import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import RecipeDetail from '../../recipes/components/RecipeDetail';
import {deleteRecipe} from '../myRecipes-actions';

class MyRecipe extends React.Component{
  state = {
    redirect: false
  }

  handleClick = () => {
    const {location: {state: {uri}}} = this.props;
    this.props.dispatch(deleteRecipe(uri, []))  
      .then(() => this.setState({redirect: true}))
  }

  render() { 
    const {location: {state}, match: {params: {username}}} =this.props;

    if (this.state.redirect) {
      return <Redirect to={`/user/${username}/recipes/myRecipes`} />
    };

    return (
      <div>
        <RecipeDetail 
          details={state}
          buttonLabel='Remove from My Recipes'
          handleClick={this.handleClick}
          isSaved={false}
          disabled={false} />
      </div>
    )
  }
}

export default connect()(MyRecipe)