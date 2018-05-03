import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as fromRecipe from './recipe.reducers';
import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.ofType(RecipeActions.FETCH_RECIPES)
    .switchMap(
      (action: RecipeActions.FetchRecipes) => {
        return this.httpClient.get<Recipe[]>('https://ng-dummy-prj.firebaseio.com/recipes.json');
      }
    )
    .map(
      (recipes: Recipe[]) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(
      ([action, state]) => {
        return this.httpClient.put('https://ng-dummy-prj.firebaseio.com/recipes.json', state.recipes);
      }
    )
    .map(
      (recipes: Recipe[]) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.RecipesState>) { }

}
