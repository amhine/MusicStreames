import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    if (!value || isNaN(value)) return '00:00';

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);

    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
