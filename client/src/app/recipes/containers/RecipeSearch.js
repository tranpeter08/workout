import React from 'react';
import {connect} from 'react-redux';
import RecipeSrchGrp from './RecipeSearchForm';
import RecipeResult from '../components/RecipeResult';
import {queryStr} from '../../misc/utils';
import {getRecipes, recipeClear} from '../recipes-actions';
import Pagination from './RecipePaging';

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
      state => ({q: state.term}),
      this.handleRequest
    )
  }

  handleRequest = () => {
    const {modal, modalData, filters, ...params} = this.state;

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
    <li key={item.recipe.uri}>
      <RecipeResult
        {...item} />
      <hr />
    </li>
  )
  

  renderResultsSection = () => {
    const {from, to} = this.state;
    const {results, q} = this.props.recipes;

    if (results) {
      return (
        <section className='recipe-results'>
          <h2>Search results for "{q}"</h2>
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
            <ul>{this.renderResults()}</ul> : <p>No search results found...</p>
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

    return (
      <React.Fragment>
        <RecipeSrchGrp 
          term={term}
          handleChange={this.handleChange}
          clearFilterState={this.clearFilterState}
          handleSubmit={this.handleSubmit}/>
        {this.renderResultsSection()}
        {
          loading ? <div>loading...</div> : 
          error ? <div>{error.message}</div> :null
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({recipes}) => ({recipes});

export default connect(mapStateToProps)(RecipeSearch);