import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: 'recipes', component: RecipeComponent },
    {path: 'recipes/:recipeId/edit', component: RecipeComponent}
  ])],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
