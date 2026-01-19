import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { DurationPipe } from '../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-player-bar',
  standalone: true,
  imports: [CommonModule, DurationPipe],
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.css']
})
export class PlayerBarComponent {
  playerService = inject(AudioPlayerService);

  onSeek(event: any) {
    const time = event.target.value;
    this.playerService.seekTo(time);
  }

  onVolumeChange(event: any) {
    const vol = event.target.value;
    this.playerService.setVolume(vol);
  }
}
