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

  handleFiltersClass = showFilters => {
    let baseClass = 'recipe-search-filters';
    return showFilters ? baseClass + ' expanded' : baseClass + ' collapsed';
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
      <form aria-live='polite' id='recipe-search-form' onSubmit={handleSubmit}>

        <div className='recipe-searchBar'>
          <button
            aria-label={showFilters ? 'Hide Filters' : 'Show Filters'}
            id='recipe-search-filters-button'
            className={showFilters ? 'showFilters-true' : 'showFilters-false' }
            type='button'
            onClick={this.toggleFilters}
          >
            <i className="fas fa-filter"></i>
          </button>
          <input 
            name='term'
            type='text'
            value={term}
            aria-label='Search for a recipe'
            placeholder='Search recipes'
            onChange={handleChange} />
          <button 
            type='submit'
            id='recipe-search-button'
            aria-label='Search'
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className={this.handleFiltersClass(showFilters)}>

          <h3>Search Filters</h3>

          <div className='filters-container'>
            <RecipeFilters 
              legend='Diet Filters'
              filters={dietFilters}
              grpName='diet'
              handleChange={handleChange} />
            <div className='separator'></div>
            <RecipeFilters
              legend='Health Filters'
              filters={healthFilters}
              grpName='health'
              handleChange={handleChange} />
          </div>

          <button
            id='clear-filters-button'
            type='button' 
            onClick={this.clearFilters}
          >
            Clear Filters
          </button>
        </div>

      </form>
    )
  }
};

export default connect()(RecipeSrchForm);