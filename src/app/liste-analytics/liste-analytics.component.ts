import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-liste-analytics',
  templateUrl: './liste-analytics.component.html',
  styleUrls: ['./liste-analytics.component.css']
})
export class ListeAnalyticsComponent implements OnInit {

  constructor(public data:DataService) { }

  ngOnInit(): void {
    this.data.recevoir_produit_entreprise(11,(data:any)=>{
      this.data.sendEvent(3,this.data.les_produits[0])
    })
  }
  clique(item:any){
    this.data.sendEvent(3,item)
    this.data.closeSidenav()
  }
}
