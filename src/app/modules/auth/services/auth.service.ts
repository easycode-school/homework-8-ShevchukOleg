import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnLoginAnswer } from './../interfaces/OnLoginAnswer';
import { UserRegistrationInfo } from '../interfaces/userProfile';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

/**
 * сервісний клас для обробки данних із компонент
 */
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
  ) { }

  /**
   * login - метод авторизації користувача, після відправлення данних на сервер, зберігає в локальне
   * сховище данні для перманентної аутентифікації
   * @param email - електронна пошта користувача
   * @param password - пероль користувача
   */
  login(email: string, password: string): Observable<OnLoginAnswer> {
    return this.http.post<OnLoginAnswer>(`${this.apiUrl}/public/auth/login`, { email, password }, this.httpOptions).pipe(
      map((res: OnLoginAnswer): OnLoginAnswer => {
        if (!res.error) {
          localStorage.setItem('mlp_client_id', res.id);
          localStorage.setItem('mlp_client_token', res.token);
        }
        return res;
      })
    );
  }

  /**
   * signUp - метод первинної реєстрації користувача, прийає об'єкт данних про кристувача з компоненти
   * відправляє на сервер, керує виводом повідомлень
   * @param user - об'єкт данних про користувача, що реєструється
   */
  signUp(user: UserRegistrationInfo) {
    this.http.post(`${this.apiUrl}/public/auth/signup`, user, this.httpOptions).subscribe(
      (res: OnLoginAnswer): OnLoginAnswer => {
        console.log('Info send');
        if (res.error) {
          this.messageService.add({severity: 'error', summary: 'Server error', detail: res.message, life: 5000});
          return res;
        } else {
          this.router.navigate(['/auth/login']);
          this.messageService.add({severity: 'success', summary: 'Server compleat', detail: res.message, life: 3500});
          return res;
        }
      },
      (error) => {this.messageService.add({severity: 'error', summary: 'Server error', detail: error.message, life: 5000});
    });
  }
}
