import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import RecipeSrchForm from './RecipeSearchForm';
import RecipeResult from '../components/RecipeResult';
import {queryStr} from '../../misc/utils';
import {getRecipes} from '../recipes-actions';
import Pagination from './RecipePaging';
import ErrorMessage, {} from '../../misc/components/ErrorMessage';
import '../styling/recipes.css';

class RecipeSearch extends React.Component{
  state = {
    term: '',
    filters: new Map(),
    q: '',
    from: 0,
    to: 10,
    modal: false,
    modalData: ''
  }

  componentDidMount() {
    const {q} = this.props.recipes;
    if (q) {
      this.setState({term: q});
    }
  }

  handleChange = e => {
    const {name, checked, value} = e.target;
    if (name === 'term') {
      return this.setState({term: value})
    };

    return checked ? 
      this.setFilter(value, name) 
      :
      this.deleteFilter(value)
  }

  setFilter = (value, name) => {
    this.setState(state =>{
      const filters = state.filters;
      filters.set(value, name);

      return {filters};
    })
  }

  deleteFilter = key => {
    this.setState(state => {
      const filters = state.filters;
      filters.delete(key);

     return {filters};
    })
  }

  clearFilterState = () => {
    this.setState({filters: new Map()})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState(
      state => ({
        q: state.term,
        from: 0,
        to: 10
      }),
      this.handleRequest
    )
  }

  handleRequest = () => {
    const {modal, modalData, filters, ...params} = this.state;
    const {q} = this.props.recipes;

    if (!params.q && q) {
      params.q = q;
    };

    params.diet = this.filterArr('diet');
    params.health = this.filterArr('health');

    const query = queryStr(params);
    this.props.dispatch(getRecipes(query));
  }

  filterArr = name => {
    const {filters} = this.state;
    const arr = [];

    filters.forEach((value, key) => {
      if (value === name) {
        arr.push(key);
      }
    });
    return arr;
  }

  handlePaging = step => {
    this.setState(state => ({
      from: state.from + step,
      to: state.to + step
    }),
      this.handleRequest
    );
  }

  renderResults = () => {
    const {results} = this.props.recipes;
    return results.map(this.mapResult);
  }

  mapResult = item => (
    <RecipeResult
      key={item.recipe.uri}
      {...item} />
  )
  
  renderResultsSection = () => {
    const {from, to} = this.state;
    const {results, q} = this.props.recipes;

    if (results) {
      return (
        <section className='recipe-results'>
          <h3>Search results for "{q}"</h3>
          { 
            results.length > 0 ? 
              <Pagination 
                handlePaging={this.handlePaging} 
                paging={{from, to}}/> 
              :
              null
          }
          {
            results.length > 0 ? 
              <ul>{this.renderResults()}</ul> : 
              <p className='no-results'>No search results found...</p>
          }
          { 
            results.length > 0 ? 
              <Pagination 
                handlePaging={this.handlePaging} 
                paging={{from, to}}/> 
              :
              null
          }
        </section>
      )
    }
  }

  render() {
    const {loading, error} = this.props.recipes;
    const {term} = this.state;

    if (error.code === 401) {
      return <Redirect to='/unauthorized' />
    }

    return (
      <section className='recipes-section'>
        <h2>Recipes</h2>
        <RecipeSrchForm 
          term={term}
          loading={loading}
          handleChange={this.handleChange}
          clearFilterState={this.clearFilterState}
          handleSubmit={this.handleSubmit}/>
        {this.renderResultsSection()}
        <div className='recipe-search-status'>
          {
            loading ? <span>Searching...</span> : 
            error ? <ErrorMessage message={error.message} /> : null
          }
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({recipes}) => ({recipes});

export default connect(mapStateToProps)(RecipeSearch);