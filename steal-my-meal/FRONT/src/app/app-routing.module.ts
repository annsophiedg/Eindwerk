import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'meals', loadChildren: './meals/meals.module#MealsPageModule' },
  { path: 'orders', loadChildren: './profile/orders/orders.module#OrdersPageModule' },
  { path: 'order-list', loadChildren: './profile/orders/order-list/order-list.module#OrderListPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'favorite-chefs', loadChildren: './profile/favorite-chefs/favorite-chefs.module#FavoriteChefsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
