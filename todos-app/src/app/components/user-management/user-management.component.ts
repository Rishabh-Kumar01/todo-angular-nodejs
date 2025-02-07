import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperUserService, User } from '../../services/super-user.service';
import { ToastService } from '../../services/toast.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AuthStoreService } from '../../store/auth-store.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <div class="header">
      <h2>SuperUser Dashboard</h2>
      <button (click)="logout()">Logout</button>
    </div>
    <table
      mat-table
      [dataSource]="users"
      class="mat-elevation-z8"
      *ngIf="users && users.length > 0; else noUsers"
    >
      <!-- User ID Column -->
      <ng-container matColumnDef="userId">
        <th mat-header-cell *matHeaderCellDef>User ID</th>
        <td mat-cell *matCellDef="let user">{{ user._id }}</td>
      </ng-container>

      <!-- UserName Column -->
      <ng-container matColumnDef="username">
        <th mat-header-cell *matHeaderCellDef>User Name</th>
        <td mat-cell *matCellDef="let user">{{ user.username }}</td>
      </ng-container>

      <!-- Status Column -->
      <ng-container matColumnDef="isActive">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let user">
          <button mat-button color="primary" (click)="toggleStatus(user)">
            {{ user.isActive ? 'Deactivate' : 'Activate' }}
          </button>
        </td>
      </ng-container>

      <!-- Delete Column (unnamed header) -->
      <ng-container matColumnDef="delete">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let user">
          <button mat-button color="warn" (click)="deleteUser(user)">
            Delete
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

    <ng-template #noUsers>
      <p>No non-super users available.</p>
    </ng-template>
  `,
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['userId', 'username', 'isActive', 'delete'];

  constructor(
    private superUserService: SuperUserService,
    private toastService: ToastService,
    private authStore: AuthStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.superUserService.getNonSuperUsers().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.users = res.data;
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

  toggleStatus(user: User): void {
    this.superUserService.toggleUserActiveStatus(user._id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // Update the user in the list with the updated data.
          this.users = this.users.map((u) =>
            u._id === res.data!._id ? res.data! : u
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
          // Remove the user from the list.
          this.users = this.users.filter((u) => u._id !== user._id);
          const message = res.message?.trim() || 'User deleted successfully';
          this.toastService.showSuccess(message);
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
