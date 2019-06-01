import React from 'react';

const RecipeIngrdnts = ({ingredientLines}) => {
  const renderIngrdnts = () => {
    return ingredientLines.map((line, i) => <li key={i}>{line}</li>);
  }

  return (
    <section>
      <h3>Ingredients</h3>
      <ul>
        {renderIngrdnts()}
      </ul>
    </section>
  )
}

export default RecipeIngrdnts;