import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  
  constructor(public data:DataService) { }

  ngOnInit(): void {
    this.recevoir_produit_entreprise(11)
  }
  
  recevoir_produit_entreprise(id_entreprise:number){
    this.data.requete_post("get_product_by_entreprise.php",{id_entreprise:id_entreprise},(data:any)=>{
      this.data.les_produits=data
    })
  }
}
