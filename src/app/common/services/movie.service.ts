import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private requestUrl: string;

  constructor(
    private http: HttpClient
  ) { }

  getMovies(): Observable<any> {
    this.requestUrl = `${environment.baseUrl}/movie?api_key=4354f6ae31f4b4ff46b7d97ba0343089&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=&without_genres=28&with_watch_monetization_types=flatrate`;
    return this.http.get(this.requestUrl);
  }

}
