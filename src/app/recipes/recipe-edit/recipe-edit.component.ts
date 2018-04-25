import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { validateConfig } from '@angular/router/src/config';
import { Ingredient } from '../../shared/Ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  reForm: FormGroup;
  id: number;
  editMode = false;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  initForm() {
    let recipName = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recipName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    }
    this.reForm = new FormGroup({
      'name': new FormControl(recipName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    })
  }

  addIngredient() {
    (<FormArray>this.reForm.get("ingredients")).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }))
  }

  deleteIngredient(index: number) {
    (<FormArray>this.reForm.get("ingredients")).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.editRecipe(this.id, this.reForm.value);
    } else {
      this.recipeService.addRecipe(this.reForm.value);
    }
    this.onCancel();
  }

  onCancel(index:number = null) {
    if (index) {
      this.router.navigate(['../', index], {relativeTo: this.route});
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
