import { Component, OnInit } from '@angular/core';
import { AjouterProduitComponent } from '../../modal/ajouter-produit/ajouter-produit.component';
import { ModifieProduitComponent } from '../../modal/modifie-produit/modifie-produit.component';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {
  produit:any
  ajouterproduitcomponent=AjouterProduitComponent
  
  modifierproduitcomponent=ModifieProduitComponent
  constructor(public api:ApiService) { 
    // this.produit=this.api.global.les_produits[0]
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="item_liste_produit"){
        this.produit=data.data
      }
    })
  }

  ngOnInit(): void {
    
  }
  ajouter_produit(){
    this.api.closeAllBool()
    this.api.bool.ajouterproduit=!this.api.bool.ajouterproduit
  }
  
  modifier_sortie(){
    this.api.closeAllBool()
    this.api.bool.modifiersortie=!this.api.bool.modifiersortie
    this.api.sendEvent("modifier_sortie",this.produit);
  }
}
