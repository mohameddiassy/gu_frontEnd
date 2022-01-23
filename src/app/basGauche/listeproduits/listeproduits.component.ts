import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
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
    this.api.sendEvent("item_liste_produit_sortant",item)
    this.api.closeSidenav()
    this.api.global.selected_item.bas_gauche_selected_item=item.id_produit
    this.api.global.selected_item.bas_droite_selected_item=moment().format("YYYY-MM-DD")
    this.api.redirect_to("fenetre_produit_sortant");
  }
  recevoir_produit_sortant(){
    this.api.post_utilisateur_connecte({get_products_by_id_entreprise:true,type:"sortant"}).subscribe((data:any)=>{
      this.api.global.les_produits_sortants=data.products

      this.jour=this.api.get_selected_item_by_id(this.api.global.les_produits_sortants,"id_produit",this.api.global.selected_item.bas_gauche_selected_item)
      this.jour?this.api.sendEvent("item_liste_produit_sortant",this.jour):alert("Produit inexistant dans votre entreprise")
      this.api.global.selected_item.bas_gauche_selected_item=this.jour.id_produit
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
