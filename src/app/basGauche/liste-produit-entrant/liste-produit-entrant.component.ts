import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-produit-entrant',
  templateUrl: './liste-produit-entrant.component.html',
  styleUrls: ['./liste-produit-entrant.component.css']
})
export class ListeProduitEntrantComponent implements OnInit {

  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.api.post({get_products_by_id_entreprise:true,type:"entrant",id_entreprise:1}).subscribe((data:any)=>{
      this.api.global.les_produits_entrants=data.les_produits
      this.api.sendEvent("item_liste_produit",this.api.global.les_produits_entrants[0])
    })
    
  }
  clique(item:any){
    this.api.sendEvent("item_liste_produit",item)
    this.api.closeSidenav()
  }

}
