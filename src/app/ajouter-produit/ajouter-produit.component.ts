import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {
  produit={nom_produit:"",description:"",stock:0,prix_unitaire:""}
  constructor(public data:DataService) { }

  ngOnInit(): void {
  }
  ajouter(){
    this.data.requete_post("add_product.php",{produit:JSON.stringify(this.produit)},(data:any)=>{

    })
  }
}
