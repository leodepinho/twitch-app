import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Stream } from '../models/stream';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { StreamRequest } from '../models/stream-request';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import {EndPoints} from '../../util/endpoints';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  /**
   * Get Array of Streams
   * @param request - (query,limit)
   * query - find streams with this input (channels, users, etc)
   * limit - number of results
   */
  public searchStreamByParams(request: StreamRequest): Observable<Stream[]> {
    this.spinner.show();
    let params = new HttpParams();
    for (const [key, value] of Object.entries(request)) {
      params = params.append(key, value);
    }
    return this.http.get<Stream[]>(environment.apiUrl + EndPoints.SEARCH_STREAMS_BY_PARAMS, {params: params})
      .pipe(
        finalize(() => {
          this.spinner.hide();
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Get Stream by Channel
   * @param channelName - name of the channel
   */
  public getStreamInfo(channelName: string): Observable<Stream> {
    return this.http.get<Stream>(environment.apiUrl + EndPoints.GET_STREAM_BY_CHANNEL_NAME + channelName)
      .pipe(
        map( response => {
          return response['stream'];
        }),
    catchError(this.handleError)
      );
  }

  /**
   * Handle errors from the twitch API
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error ocurred:', error.error.message);
    }
    return throwError(error);
  }
}
