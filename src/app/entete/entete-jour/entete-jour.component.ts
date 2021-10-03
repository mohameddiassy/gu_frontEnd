import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-entete-jour',
  templateUrl: './entete-jour.component.html',
  styleUrls: ['./entete-jour.component.css']
})
export class EnteteJourComponent implements OnInit {

  item:any
  constructor(public data:DataService) {
    this.item=this.data.les_jours[0]
    data.getEvent().subscribe((data)=>{
      this.item=data.item
      console.log("entete jour= ",this.item)
    })
  }

  ngOnInit(): void {
  }

}
