import React from 'react';
import NutriSearchForm from './NutriSearchForm';
import {normalizeRes} from '../../misc/utils';
import NutriResult from './NutriResult';
import NutriModal from './NutriModal';
import {API_BASE_URL} from '../../misc/config';
import '../styling/nutrition.css';

export default class Nutrition extends React.Component{
  state = {
    text: '',
    loading: false,
    results: '',
    error: '',
    modal: false,
    modalData: '',
    hasNext: false
  };

  handleSearch = term => {
    this.setState(
      {loading: true, error: null},
      () => this.getResults(term)
    );
  }

  getResults = term => {
    fetch(
      `${API_BASE_URL}/nutrition?ingr=${term}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }
    )
    .then(res => normalizeRes(res))
    .then(this.onSuccess)
    .catch(this.onError);
  }

  onSuccess = ({hints, text, hasNext}) => {
    this.setState((state, props) => ({
        loading: false,
        results: hints,
        text,
        hasNext
      })
    );
  }

  onError = err => {
    console.error(err);
    this.setState({
      loading: false,
      error: err
    });
  }

  renderResults = () => {
    return this.state.results.map((item, index) =>
        <NutriResult
          key={index}
          showModal={this.showModal} 
          {...item} />
    )
  }

  handleGetMore = () => {
    this.setState({loading: true}, this.getMoreResults);
  }

  getMoreResults = () => {
    fetch(
      `http://localhost:8080/nutrition/next`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }
    )
    .then(res => normalizeRes(res))
    .then(this.onSuccessMore)
    .catch(this.onError);
  }

  onSuccessMore = ({hints, hasNext}) => {
    this.setState(state => {
      const [first, ...rest] = hints;
      const results = [...state.results, ...rest];
      return {results, hasNext, loading: false};
    })
  }

  showModal = modalData => {
    this.setState({modal: true, modalData});
  }

  closeModal = () => {
    this.setState({modal: false, modalData: ''});
  }
  
  render() {
    const {
      loading, 
      results, 
      text,
      hasNext, 
      error, 
      modal, 
      modalData} = this.state;

    return <section className='nutrition-section'>
      {
        modal ? 
          <NutriModal {...modalData} closeModal={this.closeModal}/>
          : 
          null
      }

      <h2 className='nutri-h2' id='nutri-h2' >Nutrition</h2>

      <NutriSearchForm 
        handleSearch={this.handleSearch} 
        placeholder={'Search for a food'}
        loading={loading}/>
      
      <section className='nutri-search-results'>
        {results ? <h3>Search Results For "{text}"</h3> : null}
        <ul aria-live='polite'>
          {
            error ? <p className='error'>{error.message}</p> :
            !results ? null : 
              this.renderResults()
          }
        </ul>
        {
          loading ? <p className='nutri-search-message'>Searching...</p> :
          !results ? null :
          results.length === 0 ? <p className='nutri-search-message'>No results found</p> : null
        }
        {
          !results ? null :
          hasNext ? 
            <div>
              <button 
                id='nutri-searchMore-button' 
                onClick={this.handleGetMore}
                disabled={loading}
              >
                More Results
              </button><br/>
              <a className='to-top-anchor' href='#nutri-h2'>Back to top</a>
            </div>
            :
            null
        }
      </section>
    </section>
  }
}