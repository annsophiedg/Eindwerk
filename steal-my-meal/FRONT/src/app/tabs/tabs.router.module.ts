import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'meals',
        children: [
          {
            path: '',
            loadChildren: '../meals/meals.module#MealsPageModule'
          }
        ]
      },
    ]},
  {
    path: '',
    redirectTo: '/tabs/meals',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
