import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-listeproduits',
  templateUrl: './listeproduits.component.html',
  styleUrls: ['./listeproduits.component.css']
})
export class ListeproduitsComponent implements OnInit {
  jour:any
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.recevoir_produit_entrant()
    
  }
  clique(item:any){
    this.jour=item
    this.api.sendEvent("item_liste_produit",item)
    this.api.closeSidenav()
  }
  recevoir_produit_entrant(){
    this.api.post_utilisateur_connecte({get_products_by_id_entreprise:true,type:"sortant"}).subscribe((data:any)=>{
      this.api.global.les_produits_sortants=data.products
      this.jour=this.api.global.les_produits_sortants[0]
      this.api.sendEvent("item_liste_produit",this.jour)
    })
  }
}
