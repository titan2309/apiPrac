import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../../services/register/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  private registerService = inject(RegisterService);

  passwordType = signal<'password' | 'text'>('password');

  togglePassword() {
    this.passwordType.set(this.passwordType() === 'password' ? 'text' : 'password');
  }

  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z\s]*$/)]),

      email: new FormControl('', [Validators.required, Validators.email]),

      age: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(18),
        Validators.max(100),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,15}$/),
      ]),

      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator },
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get age() {
    return this.registerForm.get('age');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.getRawValue();

    const userData = {
      name: formValue.name,
      age: formValue.age,
      email: formValue.email,
      passowrd: formValue.password,
    };

    this.registerService.register(userData as any).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
