import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../../service/data.service';
import { ListejoursComponent } from '../listejours/listejours.component';

@Component({
  selector: 'app-listemois',
  templateUrl: './listemois.component.html',
  styleUrls: ['./listemois.component.css']
})
export class ListemoisComponent implements OnInit {

  listebasgauche:any[]=[]
  lecomponent=ListejoursComponent
  constructor(public data:DataService) { }

  ngOnInit(): void {
    // this.get_dates()
    this.data.recevoir_mois((data:any)=>{
      this.data.sendEvent(1,this.data.les_mois[0])
    })
    
  }
  clique(item:any){
    this.data.sendEvent(1,item)
    this.data.closeSidenav()
  }

}
