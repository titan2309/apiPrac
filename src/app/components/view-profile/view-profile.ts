import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewProfileService } from '../../services/viewProfile/view-profile-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserService } from '../../services/updateUser/update-user-service';

@Component({
  selector: 'app-view-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css',
})
export class ViewProfile {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viewProfileService = inject(ViewProfileService);
  private updateUserService = inject(UpdateUserService);
  private formBuild = inject(FormBuilder);

  loading = signal(true);
  editForm = this.formBuild.group({
    name: [''],
    age: [''],
    email: [''],
    password: [''],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['']);
      return;
    }

    this.viewProfileService.getUserById(id).subscribe({
      next: (res) => {
        this.editForm.patchValue(res);
        this.loading.set(false);
        console.log(res);
      },
      error: (err) => {
        this.loading.set(false);
        this.router.navigate(['']);
      },
    });
  }

  updateProfile() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    if (this.editForm.invalid) {
      return;
    }

    this.updateUserService.updateUser(id, this.editForm.value).subscribe({
      next: (res) => {
        alert('Profile Updated Successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goBack() {
    this.router.navigate(['']);
  }
}
