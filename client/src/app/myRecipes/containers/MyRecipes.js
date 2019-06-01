import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import RecipeResult from '../../recipes/components/RecipeResult';
import {getMyRecipes, deleteRecipe} from '../myRecipes-actions';

class MyRecipes extends React.Component{
  componentDidMount() {
    this.props.dispatch(getMyRecipes())
  }

  handleRemove = uri => {
    let recipes = this.props.myRecipes.recipes.filter(item => item.uri != uri);
    this.props.dispatch(deleteRecipe(uri, recipes));
  }

  renderResults = () => {
    return this.props.myRecipes.recipes.map(item =>
      <li key={item.uri}>
        <RecipeResult  recipe={item} />
        <button onClick={() => this.handleRemove(item.uri)}>
          Remove from My Recipes
        </button>
        <hr/>
      </li>
    )
  }

  render() {
    return <React.Fragment>
      <h2>MY Saved RECIPES</h2>
      <section>
          {this.props.myRecipes.recipes.length > 0 ? 
            <ul>{this.renderResults()}</ul> 
            : 
            <p>You have no recipes saved. 
                {' '}<Link to='/recipes/search'>Search</Link> for recipes and add them here.
            </p>
          }
      </section>
    </React.Fragment>
  }
}

const mapStateToProps = ({myRecipes}) => ({myRecipes});

export default connect(mapStateToProps)(MyRecipes);