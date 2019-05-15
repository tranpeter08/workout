import React from 'react';
import Search from '../components/Search';
import {normalizeRes} from '../utils';
import {NutriResult} from '../components/Nutri-result';
import NutriModal from '../components/Nutri-modal';

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
      `http://localhost:8080/nutrition?ingr=${term}`,
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
        {...item} />);
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
      console.log('nutri results', results);

    return <React.Fragment>

      {
        modal ? 
          <NutriModal {...modalData} closeModal={this.closeModal}/>
          : 
          null
      }

      <Search handleSearch={this.handleSearch} placeholder={'Search for a food'}/>

      {results ? <h2>Search Results for "{text}"</h2> : null}

      {
        error ? <p>{error.message}</p> :
        !results ? null : 
        results.length > 0 ?  
          this.renderResults()
          : 
          <div>No search results found</div>
      }

      {loading ? <div>Loading...</div> : null}

      {
        !results ? null :
        hasNext ? 
          <div>
            <button onClick={this.handleGetMore}>More Results</button>
            <a href='#search'>Back to top</a>
          </div>
          :
          null
      }

    </React.Fragment>
  }
}