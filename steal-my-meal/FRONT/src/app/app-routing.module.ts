import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'meals', loadChildren: './meals/meals.module#MealsPageModule' },
  { path: 'orders', loadChildren: './profile/orders/orders.module#OrdersPageModule' },
  { path: 'order-list', loadChildren: './profile/orders/order-list/order-list.module#OrderListPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
