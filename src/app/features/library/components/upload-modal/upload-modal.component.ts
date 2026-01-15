import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// Correction path (4 d ../ machi 5)
import { TrackService } from '../../../../core/services/track.service';
import { Track } from '../../../../core/models/track';
import { fileSizeValidator } from '../../../../shared/utils/validators';

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent {
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  trackService = inject(TrackService); // Rdditha public bach HTML ychoufha

  isSubmitting = false;
  selectedFile: File | null = null;
  selectedCover: File | null = null;

  uploadForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    artist: ['', Validators.required],
    description: ['', Validators.maxLength(200)],
    category: ['Pop', Validators.required],
    file: [null] // Validator hna optional ila drtih manuel
  });

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      this.selectedFile = file;
      if (!this.uploadForm.get('title')?.value) {
        const name = file.name.replace(/\.[^/.]+$/, "");
        this.uploadForm.patchValue({ title: name });
      }
    }
  }

  async onSubmit() {
    if (this.uploadForm.invalid || !this.selectedFile) return;
    this.isSubmitting = true;

    const newTrack: Track = {
      title: this.uploadForm.value.title!,
      artist: this.uploadForm.value.artist!,
      description: this.uploadForm.value.description || '',
      category: this.uploadForm.value.category!,
      file: this.selectedFile,
      cover: this.selectedCover, // Hada daba m3rref f Model
      duration: 0, // Duration drnaha 0 db bach nzerbo
      dateAdded: new Date()
    };

    await this.trackService.addTrack(newTrack);
    this.isSubmitting = false;
    this.close.emit();
  }
}
