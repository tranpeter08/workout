import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';
import requiresLogin from './RequiresLogin';
import UserInfo from './UserInfo';
import WorkoutList from '../../workouts/containers/WorkoutList';
import ExerciseList from '../../exercises/container/ExerciseList';
import Nutrition from '../../nutrition/components/Nutrition';
import Recipe from '../../recipes/containers/Recipe';
import RecipeSearch from '../../recipes/containers/RecipeSearch';
import MyRecipe from '../../myRecipes/containers/MyRecipe';
import MyRecipes from '../../myRecipes/containers/MyRecipes';
import {getProfile} from '../../user/user-actions';
import { logOut } from '../../auth/auth-actions';
import '../style/userPage.css';

class UserPage extends React.Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.props.dispatch(getProfile());
  }

  componentWillUnmount() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  onError = error => {
    console.error('user error')
    this.logoutTimer = setTimeout(
      this.handleError,
      3*1000
    )

    if ( error.code = 401 ) {
      return <div><p>Unauthorized access. Logging out...</p></div>
    } else {
      return <div><p>An error has occurred. Logging out...</p></div>
    }
  }

  handleError = () => {
    this.setState({redirect: true},
    () => this.props.dispatch(logOut())
    )
  }

  render() {
    const {path} = this.props.match;
    const {profile, loading, error} = this.props.user;
    if (error) {
      return this.onError(error);
    }

    if (loading) {
      return <div>loading</div>;
    }

    if (profile) {
      return (
        <main className='userPage-main'>
          <Switch>
            <Route path={`${path}/recipes/myRecipes/details`} component={MyRecipe} />
            <Route path={`${path}/recipes/myRecipes`} component={MyRecipes} />
            <Route path={`${path}/recipes/search/details`} component={Recipe} />
            <Route path={`${path}/recipes/search`} component={RecipeSearch} />
            <Route path={`${path}/nutrition`} component={Nutrition} />
            <Route path={`${path}`} component={UserInfo} />
          </Switch>
          <Switch>
            <Route 
              path={`${path}/workouts/:workoutName/exercises`}
              component={ExerciseList} />
            <Route path={`${path}/workouts`} component={WorkoutList} />
          </Switch>
        </main>
      )
    }
    return <div></div>;
  }
};

const mapStateToProps = ({user}, props) => ({user});
const connectedUserPage = connect(mapStateToProps)(UserPage);
export default requiresLogin(withRouter(connectedUserPage));