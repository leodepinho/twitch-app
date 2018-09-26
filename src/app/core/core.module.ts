import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TwitchService } from './services/twitch.service';
import { AuthenticationInterceptor } from './http-interceptors/authentication.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StreamCardComponent } from './components/stream-card/stream-card.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot(),
    NgxSpinnerModule,
  ],
  declarations: [
    NavbarComponent,
    StreamCardComponent,
    HomeComponent,
    NotFoundComponent
  ],
  providers: [
    TwitchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    NgxSmartModalService,
    NgxSpinnerService,
  ],
  exports: [
    RouterModule,
    NgxSpinnerModule,
    NavbarComponent,
    StreamCardComponent,
    HomeComponent,
    NotFoundComponent,
  ]
})
export class CoreModule { }
