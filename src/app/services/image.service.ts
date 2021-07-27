import {Injectable} from '@angular/core';
import {environment} from './../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

    getImageSrc(filePath): Observable<string> {
      const messageSource = new BehaviorSubject('');
      const resultObservable = messageSource.asObservable();
      const  oReq = new XMLHttpRequest();
      oReq.open('GET', `${environment.imageLocation + filePath}`, true);
      oReq.responseType = 'arraybuffer';

      oReq.onload = function (oEvent) {
        const arrayBuffer = oReq.response; // Note: not oReq.responseText
        if (arrayBuffer) {
          const binaryString = '';
       const base64String = btoa(
            new Uint8Array(arrayBuffer)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );

          messageSource.next('data:image/png;base64, ' + base64String);
        }
      };

      oReq.send(null);
      return resultObservable;
  }
  public uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', environment.apiUrl + 'photo/upload', formData, options);
    return this.httpClient.request(req);
  }
  convertImage(path: string): string {
    return environment.imageLocation + path;
  }
}
