import { EventsService } from './events.service';
import { Component } from '@angular/core'

@Component({
    selector: 'events',//<events>
    template: `<h2>{{ title }}</h2>
                <div class="centerEvents">
                    <div *ngFor='let event of events; let i = index'>
                        <div class='dates' *ngIf='event.fullDate !== events[i-1]?.fullDate'> <p> {{ event.fullDate }} </p></div>
                        <div class='events'> 
                            <div class='time'> {{ event.eventTime }} </div>
                            <div class='allEvents'>
                                <p> {{ event.hourTime }} {{ event.name }} </p>
                                <p class='city'> {{ event.cityName }} </p> 
                            </div>
                            <button class='button' (click)="hey(event)"> Join! </button>
                        </div>
                    </div>
                </div>`
})
export class EventsComponent {
    title = "List of Events";
    events;
    uniqueDateEvents;

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
                
                // console.log(evt.length)
                for(let i = 0; i < evt.length; i++) {
                    names.push(Object(evt[i]))
                }
                this.events = names;
                this.getCities();
                this.getTimes();
                this.sortByDate();
            })
            .catch(error => console.log(error));
    }

    hey(e){
        console.log("hey",e)
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

    getTimes() {
        let eventData = this.events;
        let times = [];

        for(let i = 0; i < eventData.length; i++) {
            times.push(eventData[i].startDate)
            for(let y = 0; y < times.length; y++) {
                eventData[i]['eventTime'] = times[y].split('T')[1].slice(0, 5)
                eventData[i]['eventDate'] = new Date(times[y]).getDate()
                eventData[i]['fullDate'] = new Date(times[y]).toDateString()
            }
        }
        this.events = eventData
        console.log(this.events)
    }

    sortByDate() {
        let eventData = this.events;
        let date = [];
        
        for(let i = 0; i < eventData.length; i++) {
            date.push(eventData[i].fullDate)
        }
        let uniqueDates = [... new Set(date)]
        console.log(uniqueDates)

        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                let x = a[key]; let y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        
        this.events = sortByKey(eventData, 'startDate');
        this.uniqueDateEvents = uniqueDates;
        // this.events = eventData
    }
}