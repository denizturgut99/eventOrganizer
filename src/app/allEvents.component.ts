import { EventsService } from './events.service';
import { Component } from '@angular/core'

@Component({
    selector: 'events',//<events>
    template: `<h2>{{ title }}</h2>
                <div>
                    <div class='events container' *ngFor='let event of events'>
                    <div class='time'> {{ event.eventTime }} </div>
                        <div class='allEvents'>
                            <p> {{ event.hourTime }} {{ event.name }} </p>
                            <p class='city'> {{ event.cityName }} </p>
                        </div>
                    </div>
                </div>`
})
export class EventsComponent {
    title = "List of Events";
    events;

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
                let names = [];
                let dates = [];
                
                // console.log(evt.length)
                for(let i = 0; i < evt.length; i++) {
                    names.push(Object(evt[i]))
                    // dates.push(Array(evt[i].startDate))
                }
                this.events = names;
                this.getCities();
                this.getHours();
            })
            .catch(error => console.log(error));
    }

    getHours() {
        let eventData = this.events;
        let times = [];

        for(let i = 0; i < eventData.length; i++) {
            times.push(eventData[i].startDate)
            for(let y = 0; y < times.length; y++) {
                eventData[i]['eventTime'] = times[y].split('T')[1].slice(0, 5)
            }
        }
        this.events = eventData
        console.log(this.events)
    }

    getCities() {
        let ct;
        let allEvts = this.events
        
        fetch("http://localhost:3000/cities")
        .then(response => {
            return response.json()
        })
        .then(json => {
            ct = json
            assignCityNames();
        })
        .catch(error => console.log(error));

        function assignCityNames() {
            let evtData = allEvts;
            
            for(let i = 0; i < evtData.length; i++) {
                for(let y = 0; y < ct.length; y++) {
                    if(evtData[i].city == ct[y].id) {
                        evtData[i]['cityName'] = ct[y].name
                    }
                }
            }
            allEvts = evtData;
        }
        this.events = allEvts;
        // console.log(this.events)
    }
}