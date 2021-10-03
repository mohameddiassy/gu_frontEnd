import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {
  produit={id_enregistreur:1,id_entreprise:11,nom_produit:"",description:"",stock:0,prix_unitaire:""}
  
  succes=false
  echec=false
  id_entreprise:number=0
  constructor(public data:DataService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  ajouter(){
    console.log(this.produit)
    this.data.requete_post("add_product.php",{produit:JSON.stringify(this.produit)},(data:any)=>{
      if (data.status) {
        this.succes=true
        this.produit={id_enregistreur:1,id_entreprise:11,nom_produit:"",description:"",stock:0 ,prix_unitaire:""}      
      } else {
        this.echec=false
      }
    })
  }
  close(){
    this.data.bool.ajouterproduit=!this.data.bool.ajouterproduit
  }
}
