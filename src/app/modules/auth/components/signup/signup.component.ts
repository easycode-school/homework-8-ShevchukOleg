import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Gender } from '../../interfaces/Gender';
import { MyErrorStateMatcher } from './../../../../helpers/errorStateMatcher';
import { UserRegistrationInfo } from './../../interfaces/userProfile';
import { Month } from './../../interfaces/Month';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  /**
   * змінна для бробки та візуалізації поля вибору статі
   */
  public genders: Gender[] = [
    {value: 'male', viewValue: 'man' },
    {value: 'female', viewValue: 'woman' }
  ];
  /**
   * змінна для днів місяця у формі
   */
  public days: string[] = [];
  /**
   * змінна для бробки та візуалізації поля вибору місяця народження користувача
   */
  public monthNames: Month[] = [
    {value: 1, viewValue: 'January'},
    {value: 2, viewValue: 'February'},
    {value: 3, viewValue: 'March'},
    {value: 4, viewValue: 'April'},
    {value: 5, viewValue: 'May'},
    {value: 6, viewValue: 'June'},
    {value: 7, viewValue: 'July'},
    {value: 8, viewValue: 'August'},
    {value: 9, viewValue: 'September'},
    {value: 10, viewValue: 'October'},
    {value: 11, viewValue: 'November'},
    {value: 12, viewValue: 'December'}
  ];

  public matcher = new MyErrorStateMatcher();
  constructor(
    private authService: AuthService
  ) { }
/**
 * заповнює змінну днів значеннями, стрворює FormGroup
 */
  ngOnInit() {
    this.makeDays();
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'nickname': new FormControl('', [Validators.required]),
      'first_name': new FormControl('', [Validators.required]),
      'last_name': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'gender': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required] ),
      'country': new FormControl('', [Validators.required] ),
      'date_of_birth_day': new FormControl ( 0 , [Validators.required]),
      'date_of_birth_month': new FormControl ( 0 , [Validators.required]),
      'date_of_birth_year': new FormControl ( '', [Validators.required])
    });
  }

  /**
   * метод для заповнення днів місця для форми
   */
  private makeDays() {
    let i = 1;
    while (i !== 32) {
      this.days.push(i.toString());
      i++;
    }
  }

  /**
   * метод сабміту форми реєстрації, створює об'єкт данних про користувача, та надсилає його
   * до сервісу на відправку до серверу
   */
  onSignup() {
    const user: UserRegistrationInfo = {
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      nickname: this.signupForm.get('nickname').value,
      first_name: this.signupForm.get('first_name').value,
      last_name: this.signupForm.get('last_name').value,
      phone: this.signupForm.get('phone').value,
      gender_orientation: this.signupForm.get('gender').value,
      city: this.signupForm.get('city').value,
      country: this.signupForm.get('country').value,
      date_of_birth_day: +this.signupForm.get('date_of_birth_day').value,
      date_of_birth_month: +this.signupForm.get('date_of_birth_month').value,
      date_of_birth_year: +this.signupForm.get('date_of_birth_year').value
    };

    this.authService.signUp(user);
  }

}
