import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRecipe from '../../store/recipe.reducers';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeId: number;
  recipeState: Observable<fromRecipe.State>;

  constructor(private store: Store<fromRecipe.RecipesState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }

}
