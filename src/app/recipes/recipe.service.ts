import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.services';

@Injectable()

export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
       "Tasty Schnitzel",
       "This simply a test",
       "http://media.istockphoto.com/photos/tasty-schnitzel-with-potato-chips-picture-id629277048",
       [
         new Ingredient('Meat', 1),
         new Ingredient('French Fries', 20)
       ]
     ),
    new Recipe(
      "Big Fat Burger",
      "This simply a test",
      "https://thejigsawpuzzles.com/img-puzzle-6454095-1024/Big-Burger",
      [
       new Ingredient('Buns', 2),
       new Ingredient('Meat', 1)
      ]
    )
  ];
  constructor(private shoppingListService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice(); // get only copy
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  
  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }  
  updateRecipes(newRecipes: Recipe[]){
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}