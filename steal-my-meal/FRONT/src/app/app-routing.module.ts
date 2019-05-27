import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'meals', loadChildren: './meals/meals.module#MealsPageModule' },
  { path: 'add-meal', loadChildren: './meals/add-meal/add-meal.module#AddMealPageModule' },
  { path: 'profile', loadChildren: './profile/profile.page.html' },
  { path: 'edit-user', loadChildren: './profile/edit-user/edit-user.module#EditUserPageModule' },
  { path: 'allergies', loadChildren: './profile/allergies/allergies.module#AllergiesPageModule' },
  { path: 'favorite-chefs', loadChildren: './profile/favorite-chefs/favorite-chefs.module#FavoriteChefsPageModule' },
  { path: 'experience', loadChildren: './profile/experience/experience.module#ExperiencePageModule' },
  { path: 'cooked-meals', loadChildren: './profile/cooked-meals/cooked-meals.module#CookedMealsPageModule' },
  { path: 'meal-detail', loadChildren: './meals/meal-detail/meal-detail.module#MealDetailPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
