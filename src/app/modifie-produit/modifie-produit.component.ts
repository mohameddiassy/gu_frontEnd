import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modifie-produit',
  templateUrl: './modifie-produit.component.html',
  styleUrls: ['./modifie-produit.component.css']
})
export class ModifieProduitComponent implements OnInit {
  id_produit:number=0
  produit={nom_produit:"",description:"",stock:0,prix_unitaire:""}
  constructor(public data:DataService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params:any)=>{
      this.id_produit=params["id_produit"]
      if(this.id_produit){
        this.recevoir_produit_id()
      }else{
        console.log("pas de id_produit")
      }
    })
  }
  recevoir_produit_id(){
    this.data.requete_post("get_product_by_id.php",{id_produit:this.id_produit},(data:any)=>{
      this.produit=data[0]
    })
  }
  modifier(){
    this.data.requete_post("update_product.php",{produit:JSON.stringify(this.produit)},(data:any)=>{
      
    })
  }

}
