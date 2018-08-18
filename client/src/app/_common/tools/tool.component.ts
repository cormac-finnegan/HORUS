import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToolService} from "../_services/index";

@Component({
  selector: 'tools-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class ToolComponent implements OnInit {

  toolViewEnabled: boolean;

  tools: any[];
  user: Object;
  userType: string;
  constructor(private http: HttpClient, private toolService: ToolService) {
  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('loggedinUser'));

    this.toolService.getAll()
      .subscribe(
        data => {
          this.tools = data;

        });

    this.toolViewEnabled = false;

  }

  toolView(){
    this.toolViewEnabled = true;

  }

}
