import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {
  produit={id_enregistreur:0,nom_produit:"",description:"",stock:0,prix_unitaire:""}
  
  succes=false
  echec=false
  id_entreprise:number=0
  constructor(public data:DataService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.router.params.subscribe((params:any)=>{
      this.produit.id_enregistreur=params["id_enregistreur"];
      if (this.id_entreprise) {
        console.log("id_entreprise est present")
      } else {
        console.log("id_entreprise est absent")
        
      }
    })
  }
  ajouter(){
    console.log(this.produit)
    this.data.requete_post("add_product.php",{produit:JSON.stringify(this.produit)},(data:any)=>{
      if (data.status) {
        this.succes=true
        this.produit={id_enregistreur:0,nom_produit:"",description:"",stock:0 ,prix_unitaire:""}      
      } else {
        this.echec=false
      }
    })
  }
}
