import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreamViewerComponent } from './stream-viewer/stream-viewer.component';

const routes: Routes = [{ 
  path: 'streams', component: StreamViewerComponent 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
