import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../data.service';
import { ListejoursComponent } from '../listejours/listejours.component';

@Component({
  selector: 'app-listeproduits',
  templateUrl: './listeproduits.component.html',
  styleUrls: ['./listeproduits.component.css']
})
export class ListeproduitsComponent implements OnInit {

  listebasgauche:any[]=[]
  lecomponent=ListejoursComponent
  constructor(public data:DataService) { }

  ngOnInit(): void {
    this.data.recevoir_produit_entreprise(11,(data:any)=>{
      this.data.sendEvent(2,this.data.les_produits[0])
    })
    
  }
  clique(item:any){
    this.data.sendEvent(2,item)
    this.data.closeSidenav()
  }

}
