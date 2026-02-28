import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewProfileService } from '../../services/viewProfile/view-profile-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateUserService } from '../../services/updateUser/update-user-service';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css',
})
export class ViewProfile {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viewProfileService = inject(ViewProfileService);
  private updateUserService = inject(UpdateUserService);
  private fb = inject(FormBuilder);

  loading = signal(true);
  passwordType = signal<'password' | 'text'>('password');

  togglePassword() {
    this.passwordType.set(this.passwordType() === 'password' ? 'text' : 'password');
  }

  editForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['']);
      return;
    }

    this.viewProfileService.getUserById(id).subscribe({
      next: (res) => {
        this.editForm.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          role: res.role,
          password: res.password,
        });

        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['']);
      },
    });
  }

  updateProfile() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || this.editForm.invalid) return;

    const updatedData = { ...this.editForm.value };

    this.updateUserService.updateUser(id, updatedData).subscribe({
      next: () => {
        alert('Profile Updated Successfully');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  goBack() {
    this.router.navigate(['']);
  }
}
