import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SECONDS } from './config.js';

import 'core-js/stable'; // general polyfilling
import 'regenerator-runtime/runtime'; // polyfilling async/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0, Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1, Update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2, Loading recipe
    await model.loadRecipe(id);

    // 3, Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1, Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2, Load data from the search
    await model.loadSearchResults(query);

    // 3, Render results
    // resultsView.render(model.state.search.result);
    resultsView.render(model.getSearchResultsPage());

    // 4, Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log('line 49: ', err);
  }
};

const controlPaginationClick = function (goToPage) {
  // 1, Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2, Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //  Update recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1, Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2, Update recipe view
  recipeView.update(model.state.recipe);

  // 3, Render boookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show spinner
    addRecipeView.renderSpinner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log('line 96: ', model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SECONDS * 1000);
  } catch (error) {
    console.log('line 98: 💥💥💥', error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPaginationClick(controlPaginationClick);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
