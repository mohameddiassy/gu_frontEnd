import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-produit-entrant',
  templateUrl: './liste-produit-entrant.component.html',
  styleUrls: ['./liste-produit-entrant.component.css']
})
export class ListeProduitEntrantComponent implements OnInit {
  jour:any
  constructor(public api:ApiService) {
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="update_liste_produit_entrant"){
        this.recevoir_produit_entrnt()
      }
    })
  }
  ngOnInit(): void {
    this.recevoir_produit_entrnt()
    
  }
  clique(item:any){
    this.jour=item
    this.api.sendEvent("item_liste_produit",item)
    this.api.closeSidenav()
    this.api.global.selected_item.bas_gauche_selected_item=item.id_produit
    this.api.global.selected_item.bas_droite_selected_item= moment().format("YYYY-MM-DD")
    this.api.redirect_to("fenetre_produit_entrant")
  }
  ajouter_produit_entrant(){
    this.api.closeSidenav()
      this.api.closeAllBool()
      this.api.bool.ajouterproduit=!this.api.bool.ajouterproduit
      this.api.sendEvent("ajouter_produit",{type:'entrant'});
  }
  recevoir_produit_entrnt(){
    this.api.post_utilisateur_connecte({get_products_by_id_entreprise:true,type:"entrant"}).subscribe((data:any)=>{
      console.log("produits entrants",data)
      this.api.global.les_produits_entrants=data.products
      if(data.products.length>0){
        this.jour=this.api.global.les_produits_entrants[0]
        this.api.sendEvent("item_liste_produit",this.jour)
      }      
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
}
