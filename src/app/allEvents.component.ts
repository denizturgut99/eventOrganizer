import { EventsService } from './events.service';
import { Component } from '@angular/core'

@Component({
    selector: 'events',//<events>
    template: `<h2>{{ title }}</h2>
                <div>
                    <div *ngFor='let event of events'>
                        {{ event }}
                    </div>
                </div>`
})
export class EventsComponent {
    title = "List of Events";
    allEvents;
    events;

    // constructor(service: EventsService) {
    //     this.allEvents = service.getEvents();
    //     this.events = service.cityData;
    //     this.getAllEvts();
    // }

    constructor() {
        this.getEvents()
    }

    getEvents() {
         fetch("http://localhost:3000/events")
            .then(response => {
                return response.json()
            })
            .then(json => {
                let evt = json;
                let test = [];
                let names = [];
                console.log(evt.length)
                for(let i = 0; i < evt.length; i++) {
                    test.push(Object(evt[i]))
                    // console.log(test)
                    names.push(Array(evt[i].name))
                    // console.log(names)
                }
                this.events = names
            })
            .catch(error => console.log(error));
    }
}