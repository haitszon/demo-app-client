import {Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Quote} from './quote';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
  
  
export class QuoteService {


  constructor(private http: HttpClient,
    private messageService: MessageService) {}


  private apiUrl = 'api/';


  getQuote(): Observable<Quote> {
    return this.http.get<Quote>(this.apiUrl + 'getQuote')
      .pipe(tap(quote => this.log('Fetched quote')),
            catchError(this.handleError<Quote>('getQuote')));
  }



  private log(message: string) {
    this.messageService.add(`QuoteService : ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}