import {fetchOptions, normalizeRes} from '../misc/utils';
import {API_BASE_URL} from '../misc/config';

export const MYRECIPES_REQUEST = 'MYRECIPES_REQUEST';
export const myRecipesRequest = () => ({type: MYRECIPES_REQUEST});

export const MYRECIPES_SUCCESS = 'MYRECIPES_GET_SUCCESS';
export const myRecipesSuccess = recipes => ({
  type: MYRECIPES_SUCCESS,
  recipes
});

export const MYRECIPES_DELETE = 'MYRECIPES_DELETE';
export const myRecipesDelete = recipes => ({
  type: MYRECIPES_DELETE,
  recipes
}); 

export const MYRECIPES_ERROR = 'MYRECIPES_ERROR';
export const myRecipesError = error => ({
  type: MYRECIPES_ERROR,
  error
});

export const getMyRecipes = () => (dispatch, getState) => {
  dispatch(myRecipesRequest());
  const {username} = getState().auth;
  return fetch(
    `${API_BASE_URL}/recipes/${username}`,
    fetchOptions('GET')
  )
  .then(normalizeRes)
  .then(recipes => dispatch(myRecipesSuccess(recipes)))
  .catch(error => dispatch(myRecipesError(error)))
};

export const deleteRecipe = (uri, recipes) => (dispatch, getState) => {
  dispatch(myRecipesRequest());
  const {username} = getState().auth;
  return fetch(
    `${API_BASE_URL}/recipes/${username}`,
    fetchOptions('DELETE', {uri})
  )
  .then(normalizeRes)
  .then(() => dispatch(myRecipesDelete(recipes)))
  .catch(error => {dispatch(myRecipesError(error))})
};