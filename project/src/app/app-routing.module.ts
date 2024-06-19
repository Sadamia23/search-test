import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolsComponent } from './components/schools/schools.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'schools',
    component: SchoolsComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
