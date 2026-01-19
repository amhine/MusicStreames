import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxSizeMB: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const file = control.value as File;

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
