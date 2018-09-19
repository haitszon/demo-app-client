import {Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from './user';
import {USERS} from './mock-users';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
  
  
export class UserService {


  constructor(private http: HttpClient,
    private messageService: MessageService) {}


  private apiUrl = 'api/';


  getUsers(): Observable<User[]> {

    // TODO: send the message _after_ fetching the users
//    this.messageService.add('UserService: fetched users');
    //return of(USERS);
    return this.http.get<User[]>(this.apiUrl + 'getUsers')
      .pipe(tap(users => this.log('Fetched users')),
            catchError(this.handleError('getUsers', [])));
  }

  getUser(id: number): Observable<User> {
    // TODO: send the message _after_ fetching the user
//    this.messageService.add(`UserService: fetched user id=${id}`);  
    //return of(USERS.find(user => user.id === id));
    return this.http.get<User>(this.apiUrl + 'getUserById/' + `${id}`).
      pipe(tap(_ => this.log(`Fetched user id=${id}`)),
           catchError(this.handleError<User>(`getUser id=${id}`)));
  }
  
  updateUser(user: User): Observable<any> {
      return this.http.put(this.apiUrl + 'updateUser', user, httpOptions).pipe(
      tap(_ => this.log(`Updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'addUser', user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }



  private log(message: string) {
    this.messageService.add(`UserService : ${message}`);
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
