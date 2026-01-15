import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-track-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-filters.component.html',
  styleUrls: ['./track-filters.component.css']
})
export class TrackFiltersComponent {
  @Output() search = new EventEmitter<string>();
  @Output() category = new EventEmitter<string>(); // Event jdid

  searchTerm: string = '';
  selectedCategory: string = ''; // 'All' hiya vide

  categories = ['Pop', 'Rock', 'Rap', 'Jazz', 'Classique', 'Electro'];

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }

  onCategoryChange() {
    this.category.emit(this.selectedCategory);
  }
}
