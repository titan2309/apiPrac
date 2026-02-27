import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewProfileService } from '../../services/viewProfile/view-profile-service';

@Component({
  selector: 'app-view-profile',
  imports: [],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css',
})
export class ViewProfile {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viewProfileService = inject(ViewProfileService);

  userData = signal<any | null>(null);
  loading = signal(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['']);
      return;
    }

    this.viewProfileService.getUserById(id).subscribe({
      next: (res) => {
        this.userData.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.router.navigate(['']);
      },
    });
  }

  goBack() {
    this.router.navigate(['']);
  }
}
