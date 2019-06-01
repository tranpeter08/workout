import React from 'react';
import RecipeIngrdnts from './RecipeIngredients';
import RecipeNutri from './RecipeNutrition';
import RecipeButton from './RecipeButton';

export default class RecipeDetail extends React.Component{
  render() {
    console.log(this.props);
    const {
      details: {
        image,
        calories,
        label,
        source,
        url,
        yield: servings,
        ingredientLines,
        digest
      },
      buttonLabel, handleClick, isSaved, isDisabled
    } = this.props;
    
    return (
    <React.Fragment >  
      <img src={image} alt='Food' /><br/>
      <small>Source: {source}</small>
      <RecipeButton 
        buttonLabel={buttonLabel} 
        handleClick= {handleClick} 
        isSaved={isSaved} 
        isDisabled={isDisabled} />
      <h2>{label}</h2>
      <p>Total Calories: {Math.round(calories)}</p>
      <p>Calories Per Serving: {Math.round(calories / servings)}</p>
      <p>Servings: {servings}</p>
      <RecipeIngrdnts ingredientLines={ingredientLines} />
      <h3>Recipe</h3>
      <p>Full Recipe can be found at <a href={url}>{source}</a>.</p>
      <RecipeNutri data={{digest, servings}} />
    </React.Fragment>
  )}
}