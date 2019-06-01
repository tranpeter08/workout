import React from 'react';
import {connect} from 'react-redux';
import RecipeDetail from '../components/RecipeDetail';
import {isSaved, saveRecipe} from '../recipes-actions';

class Recipe extends React.Component{
  state = {
    isSaved: false
  }

  componentDidMount() {
    this.testSaved();
  }

  testSaved = () => {
    const {
      dispatch, 
      location: {state: {uri}}, 
      match: {params: {username}} 
    } = this.props;
    dispatch(isSaved(uri, username))
      .then(isSaved => isSaved ? this.setState({isSaved}) : null);
  }

  handleSave = () => {
    const {location: {state}, match: {params: {username}}, dispatch} = this.props;
    state.username = username;
    dispatch(saveRecipe(state, username))
      .then(res => res ? this.setState({isSaved: true}) : null);
  }

  render() {
    const {location: {state}, loading} = this.props;
    return (
      <div>
        <RecipeDetail 
          details={state}
          buttonLabel='Save Recipe'
          handleClick={this.handleSave}
          isSaved={this.state.isSaved}
          isDisabled={loading}
           />
      </div>
    )
  }
}

const mapStateToProps = ({recipes: {loading}}) => ({loading})

export default connect(mapStateToProps)(Recipe);