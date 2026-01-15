import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'library',
    pathMatch: 'full'
  },

  {
    path: 'library',
    loadComponent: () => import('./features/library/library.component')
      .then(m => m.LibraryComponent)
  },

  {
    path: 'track/:id',
    loadComponent: () => import('./features/track-detail/track-detail.component')
      .then(m => m.TrackDetailComponent)
  },

  {
    path: '**',
    redirectTo: 'library'
  }
];


