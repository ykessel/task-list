import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitazeHtml'
})
export class SanitazeHtmlPipe implements PipeTransform {

 
  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(v:string | null): SafeHtml | void {
    if(typeof(v) === 'string') {
      return this._sanitizer.bypassSecurityTrustHtml(v);
    } else {
      return this._sanitizer.bypassSecurityTrustHtml('<p style="color: crimson;">Esto es un error - contenido no es un string</p>');
    }
  }
}
