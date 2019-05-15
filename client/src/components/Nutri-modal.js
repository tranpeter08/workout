import React from 'react';
import food from './food.jpg';
import {normalizeRes} from '../utils';

export default class NutriModal extends React.Component{
  state = {
    foodId: '',
    select: '',
    data: null,
    error: null,
    loading: false
  }

  componentDidMount() {
    const {food: {foodId}, measures} = this.props;

    this.setState({
        select: measures[0].uri,
        foodId,
        loading: true
      },
      () => {
        const data = this.createReqBody(foodId, this.state.select);
        this.getNutriData(data);
      }
    )
  }

  createReqBody = (foodId, measureURI) => {
    return {
      ingredients: 
      [
        {
          quantity: 1,
          measureURI,
          foodId
        }
      ],
      yield : 1
    };
  }

  getNutriData = data => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };

    fetch(
      'http://localhost:8080/nutrition',
      options
    )
    .then(res => normalizeRes(res))
    .then(this.onSuccess)
    .catch(this.onError);
  }

  onSuccess = res => {
    this.setState({
      data: res,
      loading: false
    });
  }

  onError = err => {
    this.setState({
      error: err,
      loading: false
    })
  }

  handleChange = e => {
    const {foodId} = this.state;
    this.setState(
      {
        select: e.target.value,
        loading: true
      },
      ()=> {
        let data = this.createReqBody(foodId, this.state.select);
        this.getNutriData(data);
      }
    );
  } 

  renderOptions = () => {
    return this.props.measures.map(this.mapMeasure);
  }

  mapMeasure = ({label, uri}) => {
    return <option key={uri} value={uri}>{label}</option>
  }

  renderNutri = () => {
    const {totalNutrients} = this.state.data;

    let nutriData = [];
    for (let nutri in totalNutrients) {
      const {label, quantity, unit} = totalNutrients[nutri];
      const qty = Math.round(quantity * 100) / 100;
      nutriData.push(<div key={nutri} >{label}: {qty} {unit}</div>)
    }

    return nutriData;
  }

  render() {
    console.log(this.state.select);
    const {
      food: {
        label,
        image,
        brand
      },
      closeModal} = this.props;

    const {loading, error, data} = this.state;  
    return (
      <div className='modal-backdrop'>
        <div className='modal-body'>
          <h3>{label}</h3>
          <h4>{brand}</h4>
          <img src={image || food} width='200px' alt='Result' /><br/>
          Nutrition Facts Per:{" "} 
          <select value={this.state.select} onChange={this.handleChange}>

            {this.renderOptions()}

          </select>
          <hr/>
          <section className='nutrition-section'>
            {
              error ? <div>{error.message || 'Server Error'}</div> :
              loading ? <div>loading...</div> :
              data ? 
                <div>
                  <span>Total Calories: {data.calories}</span><br/>
                  <span>Total Weight: {data.totalWeight} g</span><br />
                  {this.renderNutri()}
                </div>
                : 
                null
            }
          </section>
          <hr/>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    )
  }
}