import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const RecipeResult = props => {
  const {
    recipe: {
      label, 
      calories, 
      image, 
      healthLabels, 
      yield: servings, 
      dietLabels,
      uri
    },
    match: {url}
  } = props;

  const recipeId = uri.split('#')[1];

  const location = {
    pathname : `${url}/details`,
    search: recipeId,
    state: props.recipe
  }

  return <React.Fragment>
    <img src={image} width='200px' />
    <h3><Link to={location}>{label}</Link></h3>
    <span>Calories: {Math.round(calories * 100) / 100}</span><br/>
    <span>Serves: {servings}</span><br/>
    <span>{dietLabels.join(', ')}</span><br/>
    <span>{healthLabels.join(', ')}</span><br/>
  </React.Fragment>
}

export default withRouter(RecipeResult);