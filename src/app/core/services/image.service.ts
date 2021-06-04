import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photos } from 'src/app/shared/models/photos.model';
import { environment } from 'src/environments/environment';

const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  getImages(sol: number, page: number = 1) {
    const imagesUrl = environment.photosUrl;

    let params = new HttpParams();
    params = params.append('sol', sol.toString());
    params = params.append('page', page.toString());
    params = params.append('api_key', environment.nasaApiKey);

    return this.httpClient.get<Photos>(imagesUrl, { params, headers: httpHeaders.headers });
  }

}
