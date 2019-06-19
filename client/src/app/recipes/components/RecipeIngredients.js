import React from 'react';

const RecipeIngrdnts = ({ingredientLines}) => {
  const renderIngrdnts = () => {
    return ingredientLines.map((line, i) => <li key={i}>{line}</li>);
  }

  return (
    <section>
      <h3>Ingredients</h3>
      <div className='ingrdnts-list-container'>
        <ul>
          {renderIngrdnts()}
        </ul>
      </div>
    </section>
  )
}

export default RecipeIngrdnts;