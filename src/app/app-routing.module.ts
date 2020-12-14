import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsCategoryComponent } from './components/business/news-category/news-category.component';
import { PageNotFoundComponent } from './components/business/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'top-stories/:category',
    component: NewsCategoryComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'top-stories/home',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
