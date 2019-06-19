import React from 'react';

export default function RecipeButton(props) {
  const {buttonLabel, handleClick, isSaved, isDisabled} = props;
  return (
    <React.Fragment>
    { isSaved ?  
        <p>
          <i className="saved-icon far fa-check-circle"></i>{' '}
          Recipe saved!
        </p>
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