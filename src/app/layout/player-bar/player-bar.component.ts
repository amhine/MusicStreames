import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Chofi l-import hna (zdt .service)
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { DurationPipe } from '../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-player-bar',
  standalone: true,
  imports: [CommonModule, DurationPipe],
  // Ssl7i smiyat hna:
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.css']
})
export class PlayerBarComponent {
  // Kan-injectiw Service bach n-sm3o Signals
  playerService = inject(AudioPlayerService);

  // Mli kankhdm b Range Slider (Barre de progression)
  onSeek(event: any) {
    const time = event.target.value;
    this.playerService.seekTo(time);
  }

  // Mli kanbeddel Sawt
  onVolumeChange(event: any) {
    const vol = event.target.value;
    this.playerService.setVolume(vol);
  }
}
