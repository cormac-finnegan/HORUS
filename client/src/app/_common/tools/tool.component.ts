import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToolService} from "../../_services/index";
import {Tool} from "../../_models/index";

@Component({
  selector: 'tools-admin',
  templateUrl: './tool.component.html'
})
export class ToolComponent implements OnInit {

  tools: Tool[] = [];
  user: Object;
  userType: string;

  constructor(private http: HttpClient, private toolService: ToolService) {
  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('loggedinUser'));
    this.getTools()

  }


  private getTools() {
    this.toolService.getAll()
      .subscribe(
        tools => {
          console.log(tools);
          this.tools = tools;
        });
  }
}
