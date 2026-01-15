import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxSizeMB: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Ila makanch fichier, ddz
    if (!control.value) return null;

    // Ila kan fichier (f cas d File object)
    const file = control.value as File;

    // Convertir MB l Bytes (1MB = 1024 * 1024)
    const maxSizeInBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      return {
        fileSize: {
          requiredSize: maxSizeMB + 'MB',
          actualSize: (file.size / (1024 * 1024)).toFixed(2) + 'MB'
        }
      };
    }

    return null;
  };
}
