import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/Ingredient.model';
import * as RecipeActions from './recipe.actions';
import { AppState } from '../../store/app.reducers';


export interface RecipesState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const actualState: State = {
  recipes: [
    new Recipe(
      'Oregano Chicken',
      `Preheat oven to 375 degrees F (190 degrees C). Combine the melted butter or margarine, lemon juice, Worcestershire sauce,
      soy sauce, oregano and garlic powder. Mix well. Place chicken in an ungreased 7x11 inch baking dish. Pour the butter/oregano
      mixture over the chicken. Bake in the preheated oven for 15 minutes. Baste juices over the chicken. Bake for an additional
      15 minutes. Transfer the chicken to a serving platter and serve the pan drippings over hot cooked rice, if desired.`,
      'https://images.media-allrecipes.com/userphotos/560x315/17637.jpg',
      [new Ingredient('Chicken', 1), new Ingredient('Oregano', 4)]
    ),
    new Recipe(
      'Feta Burger',
      `A thing of such delicious, dribble-down-your-chin simplicity, the noble burger can be re-invented time and time again
       to create the most divine dinnertime results. For this little incarnation, we’ve taken ground lamb and thrown in a Greek
       twist with a minty fresh kick.`,
      'https://res.cloudinary.com/hellofresh/image/upload/v1/hellofresh_s3/image/minted-lamb-and-feta-burger-bfe21526.jpg',
      [new Ingredient('Wheat', 2), new Ingredient('Eggs', 2), new Ingredient('Soy', 1)]
    )
  ]
};

export function RecipeReducer(state = actualState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      state.recipes[action.payload.index] = action.payload.updatedRecipe;
      return {
        ...state,
        recipes: [...state.recipes],
      };
    case RecipeActions.DELETE_RECIPE:
      state.recipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: [...state.recipes],
        selectedRecipeIndex: -1
      };
    default:
      return state;
  }
}
