import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; // <-- 1. Import CDR
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TrackService } from '../../core/services/track.service';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { Track } from '../../core/models/track';
import { DurationPipe } from '../../shared/pipes/duration.pipe';


@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DurationPipe],
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css']
})
export class TrackDetailComponent implements OnInit {
  track: Track | undefined;
  isEditing = false;
  isLoading = true; // <-- Zidna hadi bach ma ybanch "Introuvable" bzerba

  private trackService = inject(TrackService);
  private playerService = inject(AudioPlayerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // <-- Injectina Route
  private location = inject(Location);
  private fb = inject(FormBuilder);

  private cdr = inject(ChangeDetectorRef);

  editForm = this.fb.group({
    title: ['', Validators.required],
    artist: ['', Validators.required],
    category: ['', Validators.required],
    description: ['']
  });

  async ngOnInit() {
    const idFromUrl = this.route.snapshot.paramMap.get('id');

    if (idFromUrl) {
      // Jib Data
      this.track = await this.trackService.getTrackById(Number(idFromUrl));

      // 3. FEYYEQ ANGULAR! (Force Update)
      // Hada howa l-7ell dyal mouchkil "Introuvable" wakha data kayna
      this.isLoading = false;
      this.cdr.detectChanges();
    } else {
      this.isLoading = false;
    }
  }


  play(){
    if (this.track) this.playerService.playTrack(this.track);
  }

  goBack() {
    this.location.back();
  }

  async deleteTrack() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette musique ?')) {
      if (this.track?.id) {
        await this.trackService.deleteTrack(this.track.id);
        this.router.navigate(['/library']);
      }
    }
  }

  enableEdit() {
    if (!this.track) return;
    this.editForm.patchValue({
      title: this.track.title,
      artist: this.track.artist,
      category: this.track.category,
      description: this.track.description
    });
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  async saveEdit() {
    if (this.editForm.valid && this.track) {
      const updatedTrack: Track = {
        ...this.track,
        title: this.editForm.value.title!,
        artist: this.editForm.value.artist!,
        category: this.editForm.value.category!,
        description: this.editForm.value.description || ''
      };

      await this.trackService.updateTrack(updatedTrack);
      this.track = updatedTrack;
      this.isEditing = false;
      this.cdr.detectChanges(); // Update ta hna
    }
  }
}
