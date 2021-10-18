import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {
  produit:any={}
  default_formulaire:any={nom:"",description:"",categorie:null,stock:0,prix_unitaire:0}
  succes=false
  echec=false
  id_entreprise:number=0
  constructor(public api:ApiService) { 
    this.produit=this.default_formulaire
  }

  ngOnInit(): void {
    this.recevoir_categorie()
  }
  recevoir_categorie(){
    this.api.post({get_categorie:true}).subscribe((data:any)=>{
      if (data.status) {
        this.api.global.les_categories=data.les_categories
      } else {
        console.log("erreur")
      }
    })
  }
  ajouter(){
    this.produit.id_enregistreur=1
    this.produit.id_entreprise=1
    console.log(this.produit)
    this.api.post({add_product:true,produit:JSON.stringify(this.produit)}).subscribe((data:any)=>{
      console.log(data)
      if (data.status) {
        this.succes=true
        if(this.produit.categorie=="nouvelle_categorie"){
          this.recevoir_categorie()
        }
        this.produit=this.default_formulaire
      } else {
        this.echec=false
      }
    })
  }
  close(){
    this.api.bool.ajouterproduit=!this.api.bool.ajouterproduit
  }
  changement_categorie(){
    console.log(this.produit)
  }
}
