import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  id_entreprise:number=0
  constructor(public data:DataService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    
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
  ajouter_produit(){
    console.log(this.data.utilisateur_connecte)
    if(this.data.utilisateur_connecte){
      this.route.navigate(["/ajouter-produit",this.data.utilisateur_connecte.id_personne])
    }else{
      this.route.navigate(["/connexion"])
    }
  }
  consulter_sortie(){
    console.log(this.data.utilisateur_connecte)
    if(this.data.utilisateur_connecte){
      this.route.navigate(["/sorties",this.id_entreprise])
    }else{
      this.route.navigate(["/connexion"])
    }
  }
}
