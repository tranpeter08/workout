import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {RecipeSearch} from '../containers/RecipeSearch';
import MyRecipes from './MyRecipes';

class Recipes extends React.Component{

  render() {
    console.log(this.props);
    const {match} = this.props;
    return (
      <React.Fragment>
        <Route path={`${match.path}/search`} component={RecipeSearch} />
        <Route path={`${match.path}/myrecipes`} component={MyRecipes} />
      </React.Fragment>
    )
  }
}

export default withRouter(Recipes);