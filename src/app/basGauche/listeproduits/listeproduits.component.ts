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
    this.recevoir_produit_sortant()
  }
  clique(item:any){
    this.jour=item
    this.api.sendEvent("item_liste_produit",item)
    this.api.closeSidenav()
  }
  recevoir_produit_sortant(){
    this.api.post_utilisateur_connecte({get_products_by_id_entreprise:true,type:"sortant"}).subscribe((data:any)=>{
      this.api.global.les_produits_sortants=data.products
      console.log("ddddd"+data.products)
      this.jour=this.api.global.les_produits_sortants[0]
      this.api.sendEvent("item_liste_produit",this.jour)
    })
  }

  refresh(produit:any){
    this.api.post_utilisateur_connecte({refresh_produit:true,id_produit:produit.id_produit}).subscribe((data:any)=>{
      console.log("Supression de produit: ",data)
      if(data.status){
        alert("Produit réstauré avec succés")
        produit.etat=0;
      }else{
        alert("Echec de restauration")
      }
    })
  }
  
  ajouter_produit_sortant(){
      this.api.closeAllBool()
      this.api.bool.ajouterproduit=!this.api.bool.ajouterproduit
      this.api.sendEvent("ajouter_produit",{type:'sortant'});
  }
}
