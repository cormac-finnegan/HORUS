import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title = 'test map app';
  lat: number = 36.213497;
  lng: number = -112.058096;

  results = '';

  markers: marker[] = [];


  constructor(private http: HttpClient){
  }

  ngOnInit(): void {

    this.http.get('/rest/trackerNode').subscribe(data => {
      //this.markers.push(data);

      var data2 = JSON.parse(JSON.stringify(data));
      for (var i = 0; i < data2.length; i++){
        var obj = data2[i];
        this.markers.push(
          {
            lat: obj.latitude,
            lng: obj.longitude,
            tool_ref: obj.tool_id_fk,
            label: ""+obj.tool_id_fk,
            distress: obj.distress,
            draggable: false
          }
      );
        console.log(this.markers)

      }
    });

  }



}


// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  tool_ref: number;
  label?: string;
  distress: number;
  draggable: boolean;
}
