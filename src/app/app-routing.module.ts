import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  ContentViewComponent,
} from '@components/content-view/content-view.component';
import { MyComponent } from '@components/my-component/my-component.component';
import { TopbarComponent } from '@components/topbar/topbar.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home', component: ContentViewComponent,
    // children: [
    //   { path: 'user', component: MyComponent }
    // ]
  },
  { path: 'topbar', component: TopbarComponent },
  { path: 'home/user', component: MyComponent },
  { path: 'home/user/:usuario_id', component: MyComponent }
  // { path: 'home', component: ContentViewComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
