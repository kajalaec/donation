import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormField,
    MatButton,
    MatInputModule,
    MatLabel,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  passwordFieldType = 'password';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }
  ngOnInit() {
    this.form = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
  }
  onSubmit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      const login = this.authService.login(username, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
          console.log('Login successful')
        },
        error: (error) => console.error('Login error', error)
      }
      );
    }
    else {
      console.log("Incorrect credentials")
    }
  }
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
