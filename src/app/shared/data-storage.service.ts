import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
// import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipesService, private authService: AuthService) {}

    storeRecipes() {
        // const header = new HttpHeaders.set('Authorization', 'Bearer afdfuhbewibkvd');

        return this.httpClient.put('https://ng-recipe-book-512ae.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            observe: 'body',
            // headers: header
        });
    }
                                                                                                                                            
    getRecipes() {
        const token = this.authService.getToken();
        // this.httpClient.get<Recipe[]>('https://ng-recipe-book-512ae.firebaseio.com/recipes.json')
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-512ae.firebaseio.com/recipes.json?auth=' + token, {
            observe: 'body',
            responseType: 'json',
        })
        .map(
                (recipes) => {
                    console.log(recipes);
                    for(let recipe of recipes) {
                        if(!recipe['ingredients']) {
                            // console.log(recipe);
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}