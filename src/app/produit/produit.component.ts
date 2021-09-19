import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  id_entreprise:number=0
  constructor(public data:DataService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.router.params.subscribe((params:any)=>{
      this.id_entreprise=params["id_entreprise"];
      if (this.id_entreprise) {
        console.log("id_entreprise est present")
        this.recevoir_produit_entreprise()
      } else {
        console.log("id_entreprise est absent")
        
      }
    })
  }
  recevoir_produit_entreprise(){
    this.data.requete_post("get_product_by_entreprise.php",{id_entreprise:this.id_entreprise},(data:any)=>{
      this.data.les_produits=data
    })
  }
  supprimer(un_produit:any){
    this.data.requete_post("update_product_state.php",{id_produit:un_produit.id_produit},(data:any)=>{
      if(data.status){
        console.log("Suppression effectuée avec succés")
        this.recevoir_produit_entreprise()
      }else{
        console.log("Echec de suppression")
      }
    })
  }

}
