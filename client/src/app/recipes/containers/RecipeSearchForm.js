import React from 'react';
import {connect} from 'react-redux';
import {RecipeFilters} from '../components/RecipeFilter';

class RecipeSrchForm extends React.Component{
  state = {
    showFilters: false
  }

  toggleFilters = () => {
    this.setState(state => ({showFilters: !state.showFilters}))
  }

  clearFilters = () => {
    const checkboxes = document.getElementsByClassName('recipe-filter');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    this.props.clearFilterState();
  }

  render() {
    const {term, handleChange, handleSubmit} = this.props;
    const {showFilters} = this.state;
    const dietFilters = [
      'balanced',
      'high-protein', 
      'low-fat', 
      'low-carb'
    ];

    const healthFilters = [
      'peanut-free', 
      'tree-nut-free',
      'vegan', 
      'vegetarian'
    ];

    return (
      <form onSubmit={handleSubmit}>
        <input 
          name='term'
          type='text'
          value={term}
          onChange={handleChange} />
        <button type='submit'>Search</button>
        <button type='button'onClick={this.toggleFilters}>
          {showFilters ? 'Hide filters' : 'Show filters'}
        </button>
        <fieldset className={ showFilters ? '' : 'hidden'}>
          <RecipeFilters 
            legend='Diet Filters'
            filters={dietFilters}
            grpName='diet'
            handleChange={handleChange} />
          <RecipeFilters
            legend='Health Filters'
            filters={healthFilters}
            grpName='health'
            handleChange={handleChange} />
          <button 
            type='button' 
            onClick={this.clearFilters}
          >
            Clear Filters
          </button>
        </fieldset>
      </form>
    )
  }
};

export default connect()(RecipeSrchForm);