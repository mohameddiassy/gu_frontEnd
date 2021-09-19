import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  constructor(public data:DataService) { }

  ngOnInit(): void {
    this.recevoir_produits()
  }
  recevoir_produits(){
    this.data.requete_post("get_all_product.php",{recevoir_produits:true},(data:any)=>{
      this.data.les_produits=data
    })
  }

}
