import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToolService} from "../../_services/index";
import {Tool} from "../../_models/index";
import {ModalService} from "../../_services";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import {Employee} from "../../_models";


@Component({
  selector: 'tools-admin',
  templateUrl: './tool.component.html'
})
export class ToolComponent implements OnInit {
  editMode: boolean;
  dataTable: any;

  tool:Tool;
  tools: Tool[] = [];
  user: Object;
  userType: string;
  modalHeader:string;

  constructor(private http: HttpClient, private toolService: ToolService, private modalService: ModalService, private chRef: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.modalHeader = "New Tool;"

    this.tool = new Tool()
    this.user = JSON.parse(localStorage.getItem('loggedinUser'));
    this.getTools()


    $(document).ready(function () {

      $('#employeeTable_filter input').css("display:none")

      $('#employeeTable')
        .on('order.dt', function () {
          console.log('Order');
        })
        .on('search.dt', function () {
          console.log('Search');
        })
        .on('page.dt', function () {
          console.log('Page');
        })
        .on('length.dt', function () {
          console.log('Show');
        });

      $('#searchbox')
        .on('keyup', function () {
          $('#employeeTable').DataTable({
            "searching": true,
            retrieve: true
          }).on('length.dt', function () {
            console.log("Length Event");
          }).search(this.value).draw();
        })
    });

  }


  private getTools() {
    this.toolService.getAll()
      .subscribe(
        (tools: any[]) => {
          console.log(tools);
          this.tools = tools;

          this.chRef.detectChanges();
          const table: any = $('table');
          this.dataTable = table.DataTable({
            "searching": true,
            retrieve: true
          });

        });
  }

  saveTool() {
    console.log("Save: C L I C K ")

    if (!this.editMode) {
      //this.createUser();
    } else {
      this.toolService.update(this.tool)
        .subscribe(data => {
          console.log("OK?" + data)
        })
    }

  }


  openModal(id: string, header: string, newUser: boolean) {
    if (newUser == true) {
      this.editMode = false;
    } else if (newUser == false) {
      this.editMode = true;
      //this.discard()
    }
    console.log("Open Modal: " + id)
    this.modalHeader = header;
    //this.employee = new Employee();
    this.modalService.open(id);
  }

  newTool(modalName: string, header: string) {
    this.tool = new Tool()
    this.openModal(modalName, header, true);
  }


  editTool(tool: Tool, toolModal: string) {
    
  }

  deleteTool(id: number) {
    
  }
}


