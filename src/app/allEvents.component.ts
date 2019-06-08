import { EventsService } from './events.service';
import { Component } from '@angular/core'

@Component({
    selector : 'events' ,//<events>
    template : `<h2>{{ title }}</h2>
                <div>
                    <div *ngFor='let event of events.name'>
                        {{ event }}
                    </div>
                </div>`
})
export class EventsComponent {
    title = "List of Events";
    events;
    allEvents;

    constructor(service: EventsService) {
        this.allEvents = service.getEvents();
        this.events = service.cityData;
    }
}