import React from 'react';

export default function RecipeButton(props) {
  const {buttonLabel, handleClick, isSaved, isDisabled} = props;
  return (
    <React.Fragment>
    { isSaved ?  
        <p>(check)Recipe saved to My Recipes</p>
        :
        <button 
          onClick={handleClick} 
          disabled={isDisabled}>
          {buttonLabel}
        </button> 
    }
    </React.Fragment>
  )
}