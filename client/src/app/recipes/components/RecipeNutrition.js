import React from 'react';

class RecipeNutri extends React.Component{ 
  state = {
    value: this.props.data.servings
  }

  renderNutri = () => {
    const {digest} = this.props.data;

    return digest.map((line, index) => {
      if (line.sub) {
        return this.nutriFactWithSub(line, index);
      }
      return this.nutriFact(line, index);
    });
  }

  nutriText = ({label, total, daily, unit}) => {
    const {value} = this.state;
    return (
      <span>
        <span>{label}</span>{' '}
        <span>{Math.round(total / value)}{unit}</span>{' '}
        <span>{daily ? Math.round(daily / value) + '%' : '-'}</span>
      </span>
  )};

  nutriFact = (line, i) => (
    <li key={i}>
      {this.nutriText(line)}
    </li>
  );

  nutriFactWithSub = (line, i) => (
    <li key={i}>
      <details>
        <summary>
          {this.nutriText(line)}
        </summary>
        <ul>
          {line.sub.map(this.nutriFact)}
        </ul>
      </details>
    </li>
  );

  renderOptions = () => (
    <select onChange={({target: {value}}) => this.setState({value})}>
      <option value={this.props.data.servings}>Serving</option>
      <option value={1}>Recipe</option>
    </select>
  );

  render() {
    return (
      <section>
        <h3>Nutrition Facts Per {this.renderOptions()}</h3>
        <ul> <span>Nutrient | Weight | Daily%</span>
          {this.renderNutri()}
        </ul>
      </section>
    )
  }
}

export default RecipeNutri;