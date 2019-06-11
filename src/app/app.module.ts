import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EventsComponent } from './allEvents.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsService } from './events.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ //add all components here
    AppComponent, EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
