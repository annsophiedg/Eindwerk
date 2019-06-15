import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
<<<<<<< HEAD
  { path: 'meals', loadChildren: './meals/meals.module#MealsPageModule' },
  { path: 'orders', loadChildren: './profile/orders/orders.module#OrdersPageModule' },
  { path: 'edit-meal', loadChildren: './meals/edit-meal/edit-meal.module#EditMealPageModule' }
=======
  { path: 'meals', loadChildren: './meals/meals.module#MealsPageModule' }
>>>>>>> db0acebb5644fcd292b5ac82f15ccfacb371c4f6
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
