import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from 'src/app/shared/interfaces/recipe';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends BaseApiService {

  constructor(override readonly http: HttpClient) {
    super(http);
  }

  getRecipes():Observable<IRecipe[]> {
    return this.get<IRecipe[]>(this.url + `/recipes`);
  }

  getRecipe(recipeId:number){
    return this.get<IRecipe>(this.url + `/recipes/${recipeId}`);
  }

  createRecipe(recipe: IRecipe){
    return this.post(this.url + `/recipes`, recipe);
  }

  updateRecipe(recipeId:number, recipe: IRecipe){
    return this.put(this.url + `/recipes/${recipeId}`, recipe);
  }

  deleteRecipe(recipeId:number){
    return this.delete(this.url + `/recipes/${recipeId}`);
  }
}
