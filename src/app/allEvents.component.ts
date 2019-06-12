import { EventsService } from './events.service';
import { Component } from '@angular/core'

@Component({
    selector: 'events',
    template: `
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                  <div class='container'>                
                  <img height='50' width='50' src="https://avatars0.githubusercontent.com/u/1481788?s=280&v=4" alt="logo">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-item nav-link" (click)="changeView1()">All Events</a>
                            <a class="nav-item nav-link" (click)="changeView2()">My Events</a>
                        </div>
                    </div>
                  </div>
                </nav>

                <div class="centerEvents">
                    <div *ngIf='view === "all"'> 
                        <div *ngFor='let event of events; let i = index'>
                            <div class='dates' *ngIf='event.fullDate !== events[i-1]?.fullDate'> <p> {{ event.fullDate }} </p></div>
                            <div class='events'> 
                                <div class='time'> {{ event.eventTime }} </div>
                                <div class='allEvents'>
                                    <div class='evtName'> <p> {{ event.hourTime }} {{ event.name }} </p> <p class='freeEvt' *ngIf='event.isFree == true'> FREE!!! </p> </div>
                                    <p class='city'> {{ event.cityName }} </p> 
                                </div>
                                <button *ngIf='event.isSignedUp == false' id='joinButton' class='button' type='button' data-toggle="modal" data-target="#myModal" (click)="joinEvent(event)"> Join! </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="centerEvents">
                    <div *ngIf='view === "myEvts"'>
                        <div *ngFor='let event of events; let i = index'>
                            <div *ngIf='event.isSignedUp == true'>
                            <div class='dates' *ngIf='event.fullDate !== events[i-1]?.fullDate'> <p> {{ event.fullDate }} </p></div>
                            <div class='events'> 
                                <div class='time'> {{ event.eventTime }} </div>
                                <div class='allEvents'>
                                    <div class='evtName'> <p> {{ event.hourTime }} {{ event.name }} </p> <p class='freeEvt' *ngIf='event.isFree == true'> FREE!!! </p> </div>
                                    <p class='city'> {{ event.cityName }} </p> 
                                </div>
                                <button *ngIf='event.isSignedUp == true' id='joinButton' class='button' type='button' data-toggle="modal" data-target="#cancelModal" (click)="joinEvent(event)"> Cancel </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="cancelModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <p class="modal-title container" id="exampleModalLabel"> Join the event </p>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body" *ngFor='let event of modalEvt'>
                            <p> You're about to leave {{ event.name }}. This event takes place the {{ event.fullDate }} in {{ event.cityName }} </p>
                            <p> Are you sure? </p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                          <button type="button" class="btn btn-primary" data-dismiss="modal" (click)='signUpEvt()'>Yes</button>
                        </div>
                      </div>
                    </div>
                  </div>

                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <p class="modal-title container" id="exampleModalLabel"> Join the event </p>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body" *ngFor='let event of modalEvt'>
                            <p> You're about to sign up for {{ event.name }}. This event takes place the {{ event.fullDate }} in {{ event.cityName }} </p>
                            <p> Are you sure? </p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary" data-dismiss="modal" (click)='signUpEvt()'>Join</button>
                        </div>
                      </div>
                    </div>
                  </div>

                `
})
export class EventsComponent {
    title = "List of Events";
    events;
    modalEvt;
    signedUpEvts;
    view = "all";

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
                for (let i = 0; i < evt.length; i++) {
                    names.push(Object(evt[i]))
                }
                this.events = names;
                this.getCities();
                this.getTimes();
                this.sortByDate();
                this.isSignedUp();
            })
            .catch(error => console.log(error));
    }

    joinEvent(e) {
        this.modalEvt = Array(e);
    }

    changeView1() {
        this.view = 'all'
    }

    changeView2() {
        this.view = 'myEvts'
    }

    signUpEvt() {
        let targetEvt = this.modalEvt;
        let allEvts = this.events;
        let signedEvts = [];

        for(let i = 0; i < targetEvt.length; i++) {
            for(let y = 0; y < allEvts.length; y++) {
                if(allEvts[y].isSignedUp == false) {
                    if(allEvts[y].id == targetEvt[i].id) {
                        allEvts[y].isSignedUp = true;
                        // signedEvts.push(allEvts[y])
                    }
                } else {
                    if(allEvts[y].id == targetEvt[i].id) {
                        allEvts[y].isSignedUp = false;
                        // signedEvts.push(allEvts[y])
                    } 
                }
            }
        }
        // window.localStorage.setItem('signed', JSON.stringify(signedEvts));
        // let localTest = window.localStorage.getItem('signed')
        // console.log(localTest)
        this.events = allEvts
        console.log(this.events)
    }

    isSignedUp() {
        let allEvts = this.events;
        
        for(let y = 0; y < allEvts.length; y++) {
            allEvts[y]['isSignedUp'] = false;
        }
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

            for (let i = 0; i < evtData.length; i++) {
                for (let y = 0; y < ct.length; y++) {
                    if (evtData[i].city == ct[y].id) {
                        evtData[i]['cityName'] = ct[y].name
                    }
                }
            }
            allEvts = evtData;
        }
        this.events = allEvts;
    }

    getTimes() {
        let eventData = this.events;
        let times = [];

        for (let i = 0; i < eventData.length; i++) {
            times.push(eventData[i].startDate)
            for (let y = 0; y < times.length; y++) {
                eventData[i]['eventTime'] = times[y].split('T')[1].slice(0, 5)
                eventData[i]['eventDate'] = new Date(times[y]).getDate()
                eventData[i]['fullDate'] = new Date(times[y]).toDateString()
            }
        }
        this.events = eventData
    }

    sortByDate() {
        let eventData = this.events;
        let date = [];

        for (let i = 0; i < eventData.length; i++) {
            date.push(eventData[i].fullDate)
        }

        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                let x = a[key]; let y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        this.events = sortByKey(eventData, 'startDate');
    }
}