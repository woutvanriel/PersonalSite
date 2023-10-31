import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Jwt } from 'src/app/interfaces/jwt';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt: string | null;

  constructor(
    private router: Router,
    private http: HttpService,
  ) {
    this.jwt = null;
    try {
      this.jwt = localStorage.getItem('jwt');
    } catch (err) {
    }
  }

  login(username: string, password: string) {
    return this.http.httpCall<Jwt>('auth/login', 'POST', true, {
      username,
      password,
    });
  }

  canActivate() {
    return this.http.httpCall<boolean>('auth/canactivate', 'GET', true);
  }

  logout(): void {
    this.jwt = null;
    localStorage.removeItem('jwt');
    this.router.navigate(['/auth/login']);
  }

  setJwt(jwt: string): void {
    this.jwt = jwt;
    localStorage.setItem('jwt', jwt);
  }

  isLoggedIn(): boolean {
    if (this.jwt !== null && this.jwt !== 'null') {
      return true;
    }
    return false;
  }
}
