import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../core/services/recipe.service';
import { IRecipe } from '../shared/interfaces/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  pageTitle = 'Recipe Detail';
  
  recipes: IRecipe[] = [];

  errorMessage: string = '';
  sub!: Subscription;


  constructor(private service: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.service.getRecipes().subscribe({
      next: recipes => this.recipes = recipes,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
}
