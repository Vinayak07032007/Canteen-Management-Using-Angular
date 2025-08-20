import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const APP_ROUTES: Routes = [
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];

