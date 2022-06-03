import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [RecipeComponent],
  imports: [
    RecipeRoutingModule,
    SharedModule
  ],
  exports: [RecipeComponent]
})
export class RecipeModule { }
