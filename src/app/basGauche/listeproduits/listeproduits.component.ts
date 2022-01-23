import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-listeproduits',
  templateUrl: './listeproduits.component.html',
  styleUrls: ['./listeproduits.component.css']
})
export class ListeproduitsComponent implements OnInit {
  selected_produit_sortant:any
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.recevoir_produit_sortant()
  }
  clique(item:any){
    this.selected_produit_sortant=item
    this.api.sendEvent("item_liste_produit_sortant",item)
    this.api.closeSidenav()
  }
  recevoir_produit_sortant(){
    this.api.post_utilisateur_connecte({get_products_by_id_entreprise:true,type:"sortant"}).subscribe((data:any)=>{
      this.api.global.les_produits_sortants=data.products

      this.selected_produit_sortant=this.api.global.les_produits_sortants[0]
      this.selected_produit_sortant?this.api.sendEvent("item_liste_produit_sortant",this.selected_produit_sortant):alert("Produit inexistant dans votre entreprise")
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
      this.api.closeSidenav()
  }
}
