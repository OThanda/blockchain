import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreamViewerComponent } from './stream-viewer/stream-viewer.component';
import { StreamService } from './services/stream-service';

@NgModule({
  declarations: [
    AppComponent,
    StreamViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule
  ],
  providers: [
    StreamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
