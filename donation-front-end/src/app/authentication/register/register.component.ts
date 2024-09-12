import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormField,
    MatButton,
    MatInputModule,
    MatLabel,
    MatOption,
    CommonModule,
    MatIconModule,
    RouterModule,
    MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({});
  isSeller = false;
  passwordFieldType = 'password';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }
  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const userDetail = this.registerForm.value;
      this.authService.register(userDetail).subscribe({
        next: () => { console.log('Registration successful'), this.router.navigate(['/login']); },
        error: (error) => console.error('Registration error', error)
      });
    }
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [{ value: '' }, Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
}
