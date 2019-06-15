import React from 'react';

export const RecipeFilters = props => {
  const {legend, filters, grpName, handleChange} = props;

  const renderChecks = (filters, name) => {
    let checkBxs = [];
    filters.forEach(filter => checkBxs.push(
      <label key={filter} className='filter-checkox'>
        <input 
          className='recipe-filter'
          key={filter}
          name={name}
          type='checkbox'
          value={filter}
          onChange={handleChange}
          />
      {filter}
      </label>
    ))
    return checkBxs;
  }

  return <fieldset className='filters'>
    <legend><h4>{legend}</h4></legend>
      {renderChecks(filters, grpName)}
  </fieldset>
}