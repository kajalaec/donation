import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: string | null = null;
  isAuthenticated = false;
  constructor(public router: Router) { }
  login(userName: string, password: string): boolean {
    if (userName && password) {
      this.isAuthenticated = true;
      this.currentUser = userName;
      this.router.navigate(['/dashboard'])
      return true
    }
    return false
  };

  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  };

  get isLoggedIn(): boolean {
    return this.isAuthenticated
  }
  
  get user(): string | null {
    return this.currentUser;
  }
}
