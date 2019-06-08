
export class EventsService {
   getEvents() {
       let cityData = []
       return fetch("http://localhost:3000/events")
       .then(response => {
           return response.json()
       })
       .then(json => {
           cityData = json;
       })
       .catch(error => console.log(error));
   }
}