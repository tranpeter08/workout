import React from 'react';
import {RecipeNutriContext} from './RecipeNutrition';

export default function RecipeNutriLine({label, total, daily, unit}) {
  return (
    <RecipeNutriContext.Consumer>
    { value => 
      <React.Fragment>
        <div className='nutrient-label'>{label}: </div>
        <div className='nutrient-qty'>{Math.round(total / value)} {unit}</div>
        <div className='nutrient-daily'>
          {daily ? Math.round(daily / value) + '%' : '-'}
        </div>
      
      </React.Fragment>
    }
    </RecipeNutriContext.Consumer>
  );
}