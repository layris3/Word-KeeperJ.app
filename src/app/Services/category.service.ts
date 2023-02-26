import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_server } from '../Config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${api_server}categories`);
  }

  public getCategoryChapters(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${api_server}categories/${category}`);
  }

  public getChapterWords(category: string, chapter: string): Observable<any[]> {
    return this.http.get<any[]>(`categories/${category}/${chapter}`);
  }
}