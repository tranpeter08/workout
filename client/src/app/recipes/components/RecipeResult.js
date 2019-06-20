import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../styling/recipeResult.css';

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
    match: {url},
    handleRemove
  } = props;

  const recipeId = uri.split('#')[1];

  const location = {
    pathname : `${url}/details`,
    search: recipeId,
    state: props.recipe
  }

  const removeButton = 
    <button onClick={() => handleRemove(uri)}>Remove Recipe</button>;

  return <li>
    <div className='recipeResult-container'>

      <div className='recipeResult-img-container'>
        <img src={image} alt='Food representing the recipe'/>
      </div>

      <div className='recipeResult-detail-container'>
        <h3><Link to={location}>{label}</Link></h3>
        <span>
          <span className='recipeResult-label'>Calories: </span>
          {Math.round(calories * 100) / 100}
        </span>
        <span>
          <span className='recipeResult-label'>Serves: </span>
          {servings}
        </span>
        <span>
          <span className='recipeResult-label'>Diet Labels: </span>
          {dietLabels.join(', ')}
        </span>
        <span>
          <span className='recipeResult-label'>Health Labels: </span>
          {healthLabels.join(', ')}
        </span>
        <div className='remove-button-container'>{handleRemove ? removeButton : null}</div>
      </div>

    </div>
  </li>
}

export default withRouter(RecipeResult);