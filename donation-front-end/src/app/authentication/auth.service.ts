import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';

import { constant } from '../shared/config/constants'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public router: Router, private http: HttpClient) { }

  register(userDetail: any): Observable<any> {
    const { username, password, email, role } = userDetail
    return this.http.post<void>(`${constant.API_URL}/register`, { username, password, email, role })
      .pipe(
        tap((res) => {
          console.log('Registration Successful')
          return res
        }),
        catchError(err => {
          console.error('Registration Error', err);
          throw err
        })
      )
  }
  login(username: string, password: string): Observable<{ token: string }> {

    return this.http.post<{ token: string }>(`${constant.API_URL}/login`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard'])
        })
      )
  };

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  };

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }


}
