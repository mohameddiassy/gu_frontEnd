import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AjouterSortieComponent } from '../ajouter-sortie/ajouter-sortie.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent implements OnInit {
  lecomponent=SortieComponent
  ajoutersortiecomponent=AjouterSortieComponent
  clicksuscription: Subscription = new Subscription;
  item:any
  recherche=""
  constructor(public data:DataService) {  
    this.item=data.les_jours[0]   
    data.getEvent().subscribe((data)=>{
      this.item=data.item
      let date=moment(this.item?.date).format("YYYY-MM-DD")
      this.data.recevoir_sorties(date)
    })
  }

  ngOnInit(): void {
    
  }
  
  ajoutersortie(){
    this.data.sendCloseClick()
  }
  
}
