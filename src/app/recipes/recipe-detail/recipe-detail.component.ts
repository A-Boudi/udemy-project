import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';
import * as slActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  public recipe: Recipe;
  id: number;
  paramsSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              public authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id']
        const recipe = this.recipeService.getRecipe(this.id);
        if (recipe) {
          this.recipe = recipe;
        } else {
          this.router.navigate(['/recipe']);
        }
      }
    );
  }

  addToShoppingList() {
    this.store.dispatch(new slActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
