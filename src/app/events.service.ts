
import { Injectable } from '@angular/core';

@Injectable()
export class EventsService {
cityData;
   getEvents() {
       let url = "http://localhost:3000/events";
       let eventData = [];
       fetch(url, {
        credentials: 'include',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json', //accept is for what we are expecting to receive
            'Content-Type': 'application/json'
        },
       })
       .then(response => {
           return response.json()
       })
       .then(eventsJson => {
           let events = eventsJson['events'];
           for(let i = 0; i < events.length; i++) {
               eventData.push(events[i])
           }
       })
       .catch(error => console.log(error));
    //    console.log(cityData)
    this.cityData = eventData
    console.log(this.cityData)
   }
}