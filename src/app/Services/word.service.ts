import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Word } from '../Models/Word';
import { catchError, Observable, throwError } from 'rxjs';
import { api_server, server } from '../Config/config';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }

  getWord(wordName: string): Observable<Word> {
    return this.http.get<Word>(api_server + "words/" + wordName)
      .pipe(
        catchError(this.handleError)
      )
  }

  addWord(word: Word): Observable<unknown> {
    return this.http.post<Word>(api_server + "words", word)
      .pipe(
        catchError(this.handleError)
      )
  }

  getChapterWords(category: string, chapter: string): Observable<Word[]> {
    return this.http.get<Word[]>(`${api_server}words/${category}/${chapter}`);
  }

  updateWord(word: Word) {
    return this.http.put<Word>(`${api_server}words/${word.wordName}`, word);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
