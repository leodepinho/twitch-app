import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamRoutingModule } from './stream-routing.module';
import { StreamDetailComponent } from './pages/stream-detail/stream-detail.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StreamRoutingModule,
    SharedModule,
  ],
  declarations: [
    StreamDetailComponent,
  ]
})
export class StreamModule { }
