import {API_BASE_URL} from '../misc/config';
import {fetchOptions, normalizeRes} from '../misc/utils';

export const RECIPES_REQUEST = 'RECIPES_REQUEST';
export const recipesRequest = term => ({
  type: RECIPES_REQUEST,
  term
});

export const RECIPES_SUCCESS = 'RECIPES_SUCCESS';
export const recipesSuccess = data => ({
  type: RECIPES_SUCCESS,
  data
});

export const RECIPE_SAVE_SUCCESS = 'RECIPE_SAVE_SUCCESS';
export const recipeSaveSuccess = () => ({type: RECIPE_SAVE_SUCCESS});

export const RECIPE_CLEAR = 'RECIPE_CLEAR';
export const recipeClear = () => ({type: RECIPE_CLEAR});

export const RECIPES_ERROR = 'RECIPES_ERROR';
export const recipesError = error => ({
  type: RECIPES_ERROR,
  error
});

export const getRecipes = query => dispatch => {
  dispatch(recipesRequest());
  return fetch(
    `${API_BASE_URL}/recipes?${query}`,
    fetchOptions('GET')
  )
  .then(normalizeRes)
  .then(res => dispatch(recipesSuccess(res)))
  .catch(error => dispatch(recipesError(error)))
}

export const isSaved = (uri, username) => dispatch => {
  return fetch(
    `${API_BASE_URL}/recipes/${username}/test`,
    fetchOptions('POST', {uri})
  )
  .then(normalizeRes)
  .then(res => res.saved)
  .catch(err => {dispatch(recipesError(err))});
}

export const saveRecipe = (recipe, username) => dispatch => {
  dispatch(recipesRequest());

  return fetch(
    `${API_BASE_URL}/recipes/${username}`,
    fetchOptions('POST', recipe)
    )
    .then(res =>{
      dispatch(recipeSaveSuccess());
      return true;
    })
    .catch(err => {dispatch(recipesError(err))});
}

