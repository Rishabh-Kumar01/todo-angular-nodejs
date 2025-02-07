import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SuperUserService,
  User,
  Pagination,
} from '../../services/super-user.service';
import { ToastService } from '../../services/toast.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { AuthStoreService } from '../../store/auth-store.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['userId', 'username', 'isActive', 'delete'];
  pagination?: Pagination;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private superUserService: SuperUserService,
    private toastService: ToastService,
    private authStore: AuthStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load first page with limit 10 on initialization.
    this.fetchUsers(1, 10);
  }

  fetchUsers(page: number, limit: number): void {
    this.superUserService.getNonSuperUsers(page, limit).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.users = res.data.users;
          this.pagination = res.data.pagination;
          const message = res.message?.trim() || 'Users fetched successfully';
          this.toastService.showSuccess(message);
        }
      },
      error: (err) => {
        const errorMsg = err.error.message?.trim() || 'Failed to fetch users';
        this.toastService.showError(errorMsg);
      },
    });
  }

  onPageChange(event: PageEvent): void {
    // Angular Material paginator is 0-indexed; convert to 1-indexed.
    const newPage = event.pageIndex + 1;
    const newLimit = event.pageSize;
    this.fetchUsers(newPage, newLimit);
  }

  toggleStatus(user: User): void {
    this.superUserService.toggleUserActiveStatus(user._id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // Store res.data in a temporary variable to guarantee it's defined.
          const updatedUser: User = res.data;
          this.users = this.users.map((u) =>
            u._id === updatedUser._id ? updatedUser : u
          );
          const message = res.message?.trim() || 'User status updated';
          this.toastService.showSuccess(message);
        }
      },
      error: (err) => {
        const errorMsg = err.error.message?.trim() || 'Failed to update status';
        this.toastService.showError(errorMsg);
      },
    });
  }

  deleteUser(user: User): void {
    this.superUserService.deleteUserById(user._id).subscribe({
      next: (res) => {
        if (res.success) {
          this.users = this.users.filter((u) => u._id !== user._id);
          const message = res.message?.trim() || 'User deleted successfully';
          this.toastService.showSuccess(message);
          // Optionally, refresh the page if needed.
          this.fetchUsers(
            this.pagination?.currentPage || 1,
            this.pagination?.limit || 10
          );
        }
      },
      error: (err) => {
        const errorMsg = err.error.message?.trim() || 'Failed to delete user';
        this.toastService.showError(errorMsg);
      },
    });
  }

  logout(): void {
    this.authStore.clearAuth();
    this.router.navigate(['/']);
  }
}
