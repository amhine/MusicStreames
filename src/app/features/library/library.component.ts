import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackService } from '../../core/services/track.service';
import { UploadModalComponent } from './components/upload-modal/upload-modal.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { TrackFiltersComponent } from './components/track-filters/track-filters.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    CommonModule,
    UploadModalComponent,
    TrackListComponent,
    TrackFiltersComponent
  ],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  trackService = inject(TrackService);

  showUploadModal = false;

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('');

  filteredTracks = computed(() => {
    const allTracks = this.trackService.tracks();
    const query = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();

    return allTracks.filter(track => {
      const matchesSearch =
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query);

      const matchesCategory = cat === '' || track.category === cat;

      return matchesSearch && matchesCategory;
    });
  });

  onSearch(query: string) {
    this.searchQuery.set(query);
  }

  onCategoryFilter(category: string) {
    this.selectedCategory.set(category);
  }
}
