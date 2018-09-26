import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Return sanitized resource url
   * @param url
   */
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
