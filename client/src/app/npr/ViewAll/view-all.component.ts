import {Component, OnInit} from "@angular/core";

import 'datatables.net';
import 'datatables.net-bs4';
import {Visitor} from "../../_models/visitor";
import {ModalService, ToolService, UserService} from "../../_services";
import {VisitorService} from "../../_services/visitor.service";
import {Employee, Tool, User} from "../../_models";
import {NewVisitorComponent} from "../AddVisitor/newVisitor.component";


@Component({
  providers: [NewVisitorComponent],
  selector: 'view-all-visitors',
  templateUrl: './view-all.component.html'
})
export class ViewAllComponent implements OnInit {
  visitor: Visitor;
  errorMessage: string;
  minAgeDate: Date;
  selectedTracker:number;

  visitorList: Visitor[] = [];
  trackerList:Tool[] = [];
  public user: User;
  public userType: string;


  constructor(private userService: UserService, private visitorService: VisitorService, private modalService: ModalService, private toolService:ToolService) {
    this.visitor = new Visitor();

  }

  ngOnInit() {
    this.getMinAgeDate()
    this.getAll();

  }


  getAll() {
    this.visitorService.getAll()
      .subscribe((visitors: Visitor[]) => {
        this.visitorList = visitors

      })
  }

  getAllTrackers(){
    this.toolService.getAllTrackers()
      .subscribe((trackers:Tool[]) => {
        this.trackerList = trackers;
      })
  }

  deleteVisitor(id: number) {
    this.visitorService.delete(id)
      .subscribe(data => {
        console.log(data)

      })
  }

  showError(message: string) {
    this.errorMessage = message;
    document.getElementById('errorMsg').hidden = false;
  }

  showSuccess() {
    this.errorMessage = null;
    document.getElementById('errorMsg').hidden = true;
    document.getElementById('successMsg').hidden = false;
    //this.closeModal(document.getElementsByTagName('modal').item(0).id);
    //this.visitor = null;
  }


  private hideMessages(){
    document.getElementById('errorMsg').hidden = true;
    document.getElementById('successMsg').hidden = true;
  }


  validateEmail(email: string) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  validateName(name: string) {
    return /^[a-z ,.'-]+$/i.test(name);
  }

  validatePhoneNumber(number: string) {
    return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(number);
  }

  getMinAgeDate() {
    var date = new Date(Date.now()).setFullYear(new Date(Date.now()).getFullYear() - 18);
    this.minAgeDate = new Date(date)
  }

  getDateNowAsDate() {
    return new Date(Date.now())
  }

  getDateNow() {
    return this.parseDate(new Date().toDateString())
  }

  parseDate(date: string) {
    return new Date(date).toISOString().split('T')[0]
  }


  private saveVisitor() {

    this.visitorService.update(this.visitor)
      .subscribe(data => {
        console.log("Final Pass = " + JSON.stringify(data))
        this.showSuccess()
      })

  }

  submit() {
    console.log("SUBMIT");

    this.saveVisitor();

  }


  openModal(id: string) {
    //this.employee = new Employee();
    this.hideMessages()
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.hideMessages();
    this.modalService.close(id);
  }

  assignTracker(visitorId:number, trackerId:number){
    console.log("Visitor ID: " + visitorId + "  TrackerID: " + trackerId)
    this.visitorService.assignTracker(visitorId, trackerId)
      .subscribe(data=>{
        console.log(typeof  data);
        this.closeModal('assign-visitor-tracker');
        this.getAll();

      })
  }

  removeTracker(visitorId:number, trackerId:number){
    console.log("Visitor ID: " + visitorId + "  TrackerID: " + trackerId)
    this.visitorService.removeTracker(visitorId, trackerId)
      .subscribe(data=>{
        console.log(typeof  data);
        //this.closeModal('assign-visitor-tracker');
        this.getAll();

      })
  }

  selectTracker(){
    if(this.selectedTracker){
      this.assignTracker(this.visitor.id, this.selectedTracker);
    }
  }


  editVisitor(visitor: Visitor, modalName: string) {
    visitor.dob = this.parseDate(visitor.dob);
    visitor.checkin_date = this.parseDate(visitor.checkin_date);
    visitor.checkout_date = this.parseDate(visitor.checkout_date);
    this.visitor = visitor;
    console.log(JSON.stringify(this.visitor))

    this.openModal(modalName);
  }

}
