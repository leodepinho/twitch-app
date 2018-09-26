import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreamDetailComponent } from './pages/stream-detail/stream-detail.component';
import { Navigation } from '../../util/navigation';

const routes: Routes = [
  {
    path: Navigation.STREAM_DETAIL_URL,
    component: StreamDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamRoutingModule { }
