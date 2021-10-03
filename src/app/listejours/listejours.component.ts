import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../data.service';

@Component({
  selector: 'app-listejours',
  templateUrl: './listejours.component.html',
  styleUrls: ['./listejours.component.css']
})
export class ListejoursComponent implements OnInit {


  lecomponent=ListejoursComponent
  constructor(public data:DataService) { }

  ngOnInit(): void {
    this.data.recevoir_jours()
    this.data.sendEvent(0,this.data.les_jours[0])
  }
  clique(item:any){
    this.data.sendEvent(0,item)
  }

}
