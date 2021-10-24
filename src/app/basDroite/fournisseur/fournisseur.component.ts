import { Component, OnInit } from '@angular/core';
import { AjouterFournisseurComponent } from 'src/app/modal/ajouter-fournisseur/ajouter-fournisseur.component';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
  fournisseur:any
  ajouterfournisseurcomponent=AjouterFournisseurComponent
  constructor(public api:ApiService) { 
    // this.produit=this.api.global.les_produits[0]
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="item_liste_fournisseur"){
        this.fournisseur=data.data
      }
    })
  }

  ngOnInit(): void {
    
  }
  ajouter_fournisseur(){
    this.api.closeAllBool()
    this.api.bool.ajouterfournisseur=!this.api.bool.ajouterfournisseur
    this.api.sendEvent("ajouter_fournisseur",this.fournisseur);
  }
  
  modifier_fournisseur(){
    this.api.closeAllBool()
    this.api.bool.ajouterfournisseur=!this.api.bool.ajouterfournisseur
    this.api.sendEvent("modifier_fournisseur",this.fournisseur);
  }
}
