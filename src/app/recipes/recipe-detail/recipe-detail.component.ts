import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as slActions from '../../shopping-list/store/shopping-list.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipesActions from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  recipeState: Observable<fromRecipe.State>;
  id: number;
  paramsSubscription: Subscription;
  authState : Observable<fromAuth.State>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.RecipesState>) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.recipeState = this.store.select('recipes');
        }
      );
    this.authState = this.store.select('auth');
  }

  addToShoppingList() {
    this.store.select('recipes').take(1).subscribe(
      (recipeState: fromRecipe.State) => {
        this.store.dispatch(new slActions.AddIngredients(
          recipeState.recipes[this.id].ingredients
        ));
      }
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
