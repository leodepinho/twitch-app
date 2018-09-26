import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {Navigation} from '../util/navigation';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: Navigation.MODULE_STREAM_URL,
    loadChildren: '../../app/modules/stream/stream.module#StreamModule',
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
