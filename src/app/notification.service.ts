import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public pushNotification(
    message: string,
    mode: 'positive' | 'negative' | 'info'
  ): void {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: this.panelClass(mode),
    });
  }

  private panelClass(mode: string): string {
    if (mode === 'positive') {
      return 'info-green';
    } else if (mode === 'negative') {
      return 'info-negative';
    } else {
      return '';
    }
  }
}
