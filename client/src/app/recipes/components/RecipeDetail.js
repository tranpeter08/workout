import React from 'react';
import RecipeIngrdnts from './RecipeIngredients';
import RecipeNutri from './RecipeNutrition';
import RecipeButton from './RecipeButton';
import '../styling/recipeDetail.css';

export default class RecipeDetail extends React.Component{
  render() {
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
      <section className='recipeDetail'>
        <section className='recipeDetail-container1'>
          <img src={image} alt='Food' />
          <small>Source: <em>{source}</em></small>
        
          <RecipeButton 
            buttonLabel={buttonLabel} 
            handleClick= {handleClick} 
            isSaved={isSaved} 
            isDisabled={isDisabled} />
        </section>

        <section className='recipeDetail-container2'>
          <h2>{label}</h2>
          <div className='recipeDetail-text-container'>
            <p><span>Total Calories: </span>{Math.round(calories)}</p>
            <p><span>Calories Per Serving: </span>{Math.round(calories / servings)}</p>
            <p><span>Servings: </span>{servings}</p>
          </div>
        </section>

        <div className='recipeDetail-container3'>
          <RecipeIngrdnts ingredientLines={ingredientLines} />
          <section>
            <h3>Recipe</h3>
            <p>Full Recipe can be found at <a href={url}>{source}</a>.</p>
          </section>
        </div>
        
        <RecipeNutri data={{digest, servings}} />
      </section>
  )}
}