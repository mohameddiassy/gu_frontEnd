import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjouterProduitComponent } from '../ajouter-produit/ajouter-produit.component';
import { AjouterSortieComponent } from '../ajouter-sortie/ajouter-sortie.component';
import { DataService } from '../data.service';
import { SortieComponent } from '../sortie/sortie.component';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {
  produit:any
  ajouterproduitcomponent=AjouterProduitComponent
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
    this.data.ajouterproduitbool=!this.data.ajouterproduitbool
  }
}
