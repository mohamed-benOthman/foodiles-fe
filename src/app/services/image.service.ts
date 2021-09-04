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
  public uploadImage(file: File, idResto, rang,  ordre): Observable<any> {
    const formData = new FormData();
    formData.append('avatar1', file);
    formData.append('name', 'fksdlfksf');
    formData.append('typePhoto', '2');
    formData.append('idResto', idResto);
    formData.append('rang', rang);
    formData.append('ordre', ordre);
    formData.append('emailUser', localStorage.getItem('email'));

    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', environment.imageLocation + 'photo/upload', formData, options);
    return this.httpClient.request(req);
  }
  public uploadImageGeneral(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar1', file);

    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', environment.imageGeneralUpload + 'photo/upload-general', formData, options);
    return this.httpClient.request(req);
  }
  convertImage(path: string): string {
    return environment.imageLocation + path;
  }

  getAll() {
    return this.httpClient.get(environment.imageLocation + 'photo/');
  }

  getImageSrcGeneral(filePath): Observable<string> {
    const messageSource = new BehaviorSubject('');
    const resultObservable = messageSource.asObservable();
    const  oReq = new XMLHttpRequest();
    oReq.open('GET', `${environment.imageGeneralPosition + filePath}`, true);
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
  changeActivity(id , isActive): Observable<any> {
    const data = {
      photoId: id,
      isActive
    };
    return this.httpClient.post(environment.apiUrl + 'photo/' + 'changeActivity', data);
  }

  modifyPhoto(id , rang, ordre): Observable<any> {
    const data = {
      photoId: id,
      rang,
      ordre
    };
    return this.httpClient.post(environment.apiUrl + 'photo/' + 'modify', data);
  }

}
