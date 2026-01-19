import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Track } from '../../../../core/models/track';
import { AudioPlayerService } from '../../../../core/services/audio-player.service';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DurationPipe],
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent {
  @Input() tracks: Track[] = [];
  @Input() isLoading = false;
  @Input() searchQuery = '';
  playerService = inject(AudioPlayerService);
  router = inject(Router); // Inject Router

  playTrack(track: Track) {
    this.playerService.setPlaylist(this.tracks);
    this.playerService.playTrack(track);
  }

  get filteredTracks() {
    if (!this.searchQuery) return this.tracks;
    return this.tracks.filter(t =>
      t.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  goToDetail(event: Event, track: Track) {
    event.stopPropagation();
    this.router.navigate(['/track', track.id]);
  }
}
