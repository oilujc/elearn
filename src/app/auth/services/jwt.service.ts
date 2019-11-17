import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

export const TOKEN_NAME: string = 'jwt';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    private url = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getToken(): string {
        return localStorage.getItem(TOKEN_NAME)
    }

    getUser(token: string): string {
        return jwt_decode(token).username
    }

    setToken(token: string): Promise<any> {
        return new Promise(resolve => {
            localStorage.setItem(TOKEN_NAME, token)
            resolve(token);
        });
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token)

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp)
        return date
    }

    isTokenExpired(token?: string): boolean {
        if (!token) token = this.getToken()
        if (!token) return true

        const date = this.getTokenExpirationDate(token)
        if (date === undefined) return false
        return !(date.valueOf() > new Date().valueOf())
    }

    logIn(user) {
        return this.http.post(`${this.url}/accounts/token`, user)
    }

    logOut(token?: string) {
        if (!token) token = this.getToken()
        if (!token) return null

        return localStorage.removeItem(TOKEN_NAME)
    }

}
