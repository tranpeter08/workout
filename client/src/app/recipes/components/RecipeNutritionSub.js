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
      return sub.map((line, i) => 
        <li 
          key={i+'sub'}  
          className='sub-line'
        >
          <RecipeNutriLine {...line} />
        </li>
      )
    }
  }

  handleClassName() {
    let className = 'caret';
    return this.state.showSub ? className + ' expanded' : className;
  }

  render() {
    const {line} = this.props;
    return (
      <React.Fragment>
      <li>
        <button className={this.handleClassName()} onClick={this.handleShowSub}>
          <i className="caret-icon fas fa-caret-right"></i>
        </button>
        <RecipeNutriLine {...line} />
        
      </li>
      {this.renderSubs(line.sub)}
      </React.Fragment>
      )
  }
}