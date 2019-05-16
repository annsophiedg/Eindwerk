import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'meals', loadChildren: './meals/meals.module#MealsPageModule' },
  { path: 'add-meal', loadChildren: './meals/add-meal/add-meal.module#AddMealPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
