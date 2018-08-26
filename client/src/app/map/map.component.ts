import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'test map app';
  lat: number = 36.213497;
  lng: number = -112.058096;

  results = '';

  markers: marker[] = [];
  trackerNodes: trackingNode[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    this.http.get('/rest/trackerNode').subscribe(data => {
      //this.markers.push(data);

      var data2 = JSON.parse(JSON.stringify(data));
      for (var i = 0; i < data2.length; i++) {
        var obj = data2[i];
        this.markers.push(
          {
            lat: obj.latitude,
            lng: obj.longitude,
            tool_ref: obj.tool_id_fk,
            label: "" + obj.tool_id_fk,
            distress: obj.distress,
            draggable: false
          }
        );
        this.trackerNodes.push(
          {
            id: obj.id,
            tool_id_fk: obj.tool_id_fk,
            latitude: obj.latitude,
            longitude: obj.longitude,
            enabled: obj.enabled,
            distress: obj.distress,
            timestamp: obj.timestamp
          }
        );
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

interface trackingNode {
  id: number;
  tool_id_fk: number;
  latitude: number;
  longitude: number;
  enabled: boolean;
  distress: boolean;
  timestamp: string;
}





