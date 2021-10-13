import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { AjouterProduitComponent } from '../../ajouter-produit/ajouter-produit.component';
import { AjouterSortieComponent } from '../../ajouter-sortie/ajouter-sortie.component';
import { DataService } from '../../service/data.service';
import { ModifieProduitComponent } from '../../modifie-produit/modifie-produit.component';
import { SortieComponent } from '../sortie/sortie.component';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {
  produit:any
  ajouterproduitcomponent=AjouterProduitComponent
  
  modifierproduitcomponent=ModifieProduitComponent
  constructor(public data:DataService) { 
    this.produit=this.data.les_produits[0]
    data.getEvent().subscribe((data)=>{
      console.log(data.index)
      this.produit=data.item
    })
  }

  ngOnInit(): void {
    
  }
  ajouter_produit(){
    this.data.closeAllBool()
    this.data.bool.ajouterproduit=!this.data.bool.ajouterproduit
  }
  
  modifier_sortie(){
    this.data.closeAllBool()
    this.data.bool.modifiersortie=!this.data.bool.modifiersortie
    this.data.sendCode("modifier_sortie",this.produit);
  }
}
