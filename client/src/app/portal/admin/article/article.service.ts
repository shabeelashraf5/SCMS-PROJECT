import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { Article } from '../../../model/ad-article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = environment.apiUrl + '/api/admin';
  
    constructor(private http: HttpClient) { }

    loadArticle(): Observable<any> {

      return this.http.get(`${this.apiUrl}/article`)
    }

    addArticle(form: Article) {

      return this.http.post(`${this.apiUrl}/article/add`, form)

    }
}
