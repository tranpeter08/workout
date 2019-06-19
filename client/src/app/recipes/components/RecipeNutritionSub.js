import React from 'react';
import RecipeNutriLine from './RecipeNutritionLine';

export default class RecipeNutriSub extends React.Component{
  state = {
    showSub: false
  }

  handleShowSub = () => {
    this.setState(state => ({showSub: !state.showSub}));
  }

  renderSubs(sub) {
    if (this.state.showSub) {
      return sub.map((line, i) => <li key={i}><RecipeNutriLine {...line} /></li>)
    }
  }

  render() {
    const {line} = this.props;
    return (
      <div>
      <li>
        <button className='caret' onClick={this.handleShowSub}>
          Caret
        </button>
        <RecipeNutriLine {...line} />
        
      </li>
      {this.renderSubs(line.sub)}
      </div>
      )
  }
}