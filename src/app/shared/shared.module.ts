import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SafePipe} from './pipes/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SafePipe
  ],
  exports: [
    SafePipe,
  ]
})
export class SharedModule { }
