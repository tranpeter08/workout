import {
  RECIPES_REQUEST, 
  RECIPES_SUCCESS,
  RECIPE_SAVE_SUCCESS,
  RECIPE_CLEAR,
  RECIPES_ERROR
} from './recipes-actions';

const initialState = {
  q: '',
  results: '',
  count:'',
  more: false,
  loading: false,
  error: ''
}

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIPES_REQUEST:
      return {...state, loading: true};
    case RECIPES_SUCCESS:
      const {data: {hits, more, count, q}} = action;
      return {...state, loading: false, results: hits, more, count, q};
    case RECIPE_SAVE_SUCCESS:
      return {...state, loading: false};
    case RECIPE_CLEAR:
      return initialState;
    case RECIPES_ERROR:
      const {error} = action;
      return {...state, loading: false, error}
    default:
      return state;
  }
}

export default recipesReducer;