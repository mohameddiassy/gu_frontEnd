import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-listeproduits',
  templateUrl: './listeproduits.component.html',
  styleUrls: ['./listeproduits.component.css']
})
export class ListeproduitsComponent implements OnInit {

  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.recevoir_produit_entrant()
    
  }
  clique(item:any){
    this.api.sendEvent("item_liste_produit",item)
    this.api.closeSidenav()
  }
  recevoir_produit_entrant(){
    this.api.post({get_products_by_id_entreprise:true,type:"sortant",id_entreprise:1}).subscribe((data:any)=>{
      this.api.global.les_produits_sortants=data.products
      this.api.sendEvent("item_liste_produit",this.api.global.les_produits_sortants[0])
    })
  }

}
