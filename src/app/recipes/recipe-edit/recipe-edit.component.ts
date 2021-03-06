import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRecipe from '../store/recipe.reducers';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  reForm: FormGroup;
  id: number;
  editMode = false;

  constructor(private store: Store<fromRecipe.RecipesState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  initForm() {
    let recipName = '';
    let imagePath = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes').take(1).subscribe(
        (recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          recipName = recipe.name;
          imagePath = recipe.imagePath;
          description = recipe.description;
          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              ingredients.push(new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              }));
            }
          }
        });
    }
    this.reForm = new FormGroup({
      'name': new FormControl(recipName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    });
  }

  addIngredient() {
    (<FormArray>this.reForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  deleteIngredient(index: number) {
    (<FormArray>this.reForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({ index: this.id, updatedRecipe: this.reForm.value }));
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.reForm.value));
    }
    this.onCancel();
  }

  onCancel(index: number = null) {
    if (index) {
      this.router.navigate(['../', index], { relativeTo: this.route });
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ingredientsControls() {
    return (<FormArray>this.reForm.get('ingredients')).controls;
  }

}
