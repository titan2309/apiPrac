import { Component, effect, inject, signal } from '@angular/core';
import { UserService } from '../../services/user/user';
import { Users } from '../../services/user/user-data-type';
import { DeleteUserService } from '../../services/deleteUser/delete-user-service';
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
  refresh = signal(0);

  constructor() {
    effect(() => {
      this.refresh();

      this.userService.getAllUsers().subscribe({
        next: (res) => {
          this.userData.set(res);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
    });
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  toAddUser() {
    this.router.navigate(['/register']);
  }

  viewProfile(id: string) {
    this.router.navigate(['/users', id]);
  }

  deleteUser(id: string) {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.deleteUserService.deleteUser(id).subscribe({
      next: () => {
        this.userData.update((users) => users.filter((user) => user.id.toString() !== id));
        alert('User Deleted Successfully');
        this.refresh.update((count) => count + 1);
      },
      error: () => {
        console.log('Failed to delete User');
      },
    });
  }
}
