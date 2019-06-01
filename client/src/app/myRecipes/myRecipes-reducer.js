import {
  MYRECIPES_REQUEST,
  MYRECIPES_SUCCESS,
  MYRECIPES_DELETE,
  MYRECIPES_ERROR
} from './myRecipes-actions';

const initialState = {
  loading: false,
  error: '',
  recipes: ''
}

const myRecipesReducer = (state = initialState, action) => {
  switch(action.type) {
    case MYRECIPES_REQUEST:
      return {...state, loading: true};
    case MYRECIPES_SUCCESS:
      return {...state,loading: false, error: '', recipes: action.recipes};
    case MYRECIPES_DELETE:
      return {...state, loading: false, recipes: action.recipes, error: ''};
    case MYRECIPES_ERROR:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
}
export default myRecipesReducer;