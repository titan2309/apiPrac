import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user/user';
import { Users } from '../../services/user/user-data-type';
import { TitleCasePipe } from '@angular/common';
import { DeleteUserService } from '../../services/deleteUser/delete-user-service';
import { ViewProfileService } from '../../services/viewProfile/view-profile-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.html',
})
export class UserList {
  private userService = inject(UserService);
  private deleteUserService = inject(DeleteUserService);
  private router = inject(Router);

  userData = signal<Users[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.userData.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  viewProfile(id: string) {
    this.router.navigate(['/users', id]);
  }

  deleteUser(id: string) {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.deleteUserService.deleteUser(id).subscribe({
      next: (res) => {
        this.userData.update((users) => users.filter((user) => user.id.toString() !== id));
        alert('User Deleted Successfully');
      },
      error: (err) => {
        console.log('Failed to delete User');
      },
    });
  }
}
