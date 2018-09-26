import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../util/globals';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  /**
   * Set authentication header (twitch credentials)
   * @param request - original request
   * @param next - request handler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set(Globals.TWITCH_CLIENT_ID_PARAM, Globals.TWITCH_CLIENT_ID_TOKEN)
    });
    return next.handle(request);
  }
}
