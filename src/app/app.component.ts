import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite [];
  satelliteType
  constructor() {
    this.sourceList = [];
    const satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
    this.displayList = [];
    this.satelliteType = [
      {typeName: 'Total', count: 0},
      {typeName: 'Space Debris', count: 0},
      {typeName: 'Communication', count: 0},
      {typeName: 'Probe', count: 0},
      {typeName: 'TPositioning', count: 0},
      {typeName: 'Space Station', count: 0},
      {typeName: 'Telescope', count: 0},
    ]

    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function (data) {
 
        const fetchedSatellites = data.satellites;
        for (let i = 0; i < fetchedSatellites.length; i++) {
          const satelliteList = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
          this.sourceList.push(satelliteList);
          this.displayList = this.sourceList.slice(0);

          for(const info of this.satelliteType) {
            if (info.typeName === satelliteList.type) {
              info.count++
              this.satelliteType[0].count++
            }
          }
        }
 
      }.bind(this));
    }.bind(this));
 
  }

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
       let name = this.sourceList[i].name.toLowerCase();
       if (name.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
       }
    }
    this.displayList = matchingSatellites;

//  Did not complete Satellite Counts Bonus Mission - For later self study:
//     this.satelliteType = [
//       { typeName: 'Total', count: 0 },
//       { typeName: 'Space Debris', count: 0 },
//       { typeName: 'Communication', count: 0 },
//       { typeName: 'Probe', count: 0 },
//       { typeName: 'Positioning', count: 0 },
//       { typeName: 'Space Station', count: 0 },
//       { typeName: 'Telescope', count: 0 },
//     ]

//     for (const satellite of this.displayList) {
//       for (const info of this.satelliteType) {
//         if (info.typeName === satellite.type) {
//           info.count++
//           this.satelliteType[0].count++
//         }
//       }
//     }
  }
};




