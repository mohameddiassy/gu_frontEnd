import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-produit-entrant',
  templateUrl: './liste-produit-entrant.component.html',
  styleUrls: ['./liste-produit-entrant.component.css']
})
export class ListeProduitEntrantComponent implements OnInit {
  selected_produit_entrant:any
  constructor(public api:ApiService) {
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="update_liste_produit_entrant"){
        this.recevoir_produit_entrnt()
      }
      else if(data.code=="apres_ajout_entree"){
        this.refresh_produit_entrnt();
      }
      else if(data.code=="apres_ajout_consommation"){
        this.refresh_produit_entrnt();
        }
    })
  }
  ngOnInit(): void {
    this.recevoir_produit_entrnt()
    
  }
  clique(item:any){
    this.selected_produit_entrant=item
    this.api.sendEvent("item_liste_produit",item)
    this.api.closeSidenav()
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
        this.selected_produit_entrant=this.api.global.les_produits_entrants[0]
        this.api.sendEvent("item_liste_produit",this.selected_produit_entrant)
      }      
    })
  }
  refresh_produit_entrnt(){
    this.api.post_utilisateur_connecte({get_products_by_id_entreprise:true,type:"entrant"}).subscribe((data:any)=>{
      console.log("produits entrants",data)
      this.api.global.les_produits_entrants=data.products
      if(data.products.length>0){
        for (let i = 0; i < this.api.global.les_produits_entrants.length; i++) {
          const un_produit = this.api.global.les_produits_entrants[i];
          if(un_produit.id_produit==this.selected_produit_entrant.id_produit){
            this.selected_produit_entrant=this.api.global.les_produits_entrants[i]
          }
        }
        this.api.sendEvent("item_liste_produit",this.selected_produit_entrant)
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
