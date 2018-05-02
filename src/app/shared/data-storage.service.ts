import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) { }

  storeRecipes() {
    return this.httpClient.put("https://ng-dummy-prj.firebaseio.com/recipes.json", this.recipeService.getRecipes());
  }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>("https://ng-dummy-prj.firebaseio.com/recipes.json")
      .map(
        (recipes: Recipe[]) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        },
        (error) => console.log(error)
      );
  }
}
