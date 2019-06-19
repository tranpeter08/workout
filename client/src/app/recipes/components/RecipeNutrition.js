import React from 'react';
import RecipeNutriLine from './RecipeNutritionLine';
import RecipeNutriSub from './RecipeNutritionSub';

class RecipeNutri extends React.Component{ 
  state = {
    value: 1
  }

  renderNutri = () => {
    const {digest} = this.props.data;

    return digest.map((line, index) => {
      if (line.sub) {
        return <RecipeNutriSub key={index} line={line} />
      }
      return <li key={index} >
        <RecipeNutriLine {...line} />
      </li>;
    });
  }

  handleChange = ({target: {value}}) => {
    this.setState({value});
  }

  renderOptions = () => (
    <select onChange={this.handleChange} value={this.state.value} >
      <option value={1}>Recipe</option>
      <option value={this.props.data.servings}>Serving</option>
    </select>
  );

  render() {
    return (
      <section className='recipeDetail-nutrition'>
        <h3><label>Nutrition Facts Per {this.renderOptions()}</label></h3>
        <h4>
          <div className='nutrient-label'>Nutrient</div>
          <div className='nutrient-qty'>Weight</div>
          <div className='nutrient-daily'>Daily%</div>        
        </h4>
        <ul> 
          <RecipeNutriContext.Provider value={this.state.value}>
            {this.renderNutri()}
          </RecipeNutriContext.Provider>
        </ul>
      </section>
    )
  }
}

export const RecipeNutriContext = React.createContext();

export default RecipeNutri;