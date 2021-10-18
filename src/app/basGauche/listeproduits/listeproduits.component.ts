import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from '../../service/data.service';
import { ListejoursComponent } from '../listejours/listejours.component';

@Component({
  selector: 'app-listeproduits',
  templateUrl: './listeproduits.component.html',
  styleUrls: ['./listeproduits.component.css']
})
export class ListeproduitsComponent implements OnInit {

  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.api.post({get_products_by_id_entreprise:true,id_entreprise:1}).subscribe((data:any)=>{
      this.api.global.les_produits=data.les_produits
      this.api.sendEvent("item_liste_produit",this.api.global.les_produits[0])
    })
    
  }
  clique(item:any){
    this.api.sendEvent("item_liste_produit",item)
    this.api.closeSidenav()
  }

}
