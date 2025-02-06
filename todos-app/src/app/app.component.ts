import { Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone
  imports: [RouterOutlet, MatSnackBarModule], // Import the RouterOutlet directive
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Correct property name: styleUrls (plural)
})
export class AppComponent {
  title = 'todos-app';
}
