import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent implements OnInit {
  clicksuscription: Subscription = new Subscription;
  item:any
  recherche=""
  constructor(public data:DataService) { 
    this.clicksuscription=data.getBasGaucheClick().subscribe((data:any)=>{
      this.item=data
      let date=moment(this.item.date).format("YYYY-MM-DD")
      this.data.recevoir_sorties(date)
    })
  }

  ngOnInit(): void {
    
  }
  
  ajoutersortie(){
    this.data.sendCloseClick()
  }
  
}
