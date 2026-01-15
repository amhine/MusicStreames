import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html', // T2kdi mn hadi
  styleUrls: ['./header.component.css']   // T2kdi mn hadi
})
// L-mohim: Zidi 'Component' f lkhher d smya
export class HeaderComponent {}
