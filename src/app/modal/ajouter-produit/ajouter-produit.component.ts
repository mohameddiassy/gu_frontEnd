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
  
  succes=false
  echec=false
  id_entreprise:number=0
  constructor(public api:ApiService,private router:ActivatedRoute) { }

  ngOnInit(): void {
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
        this.produit={}      
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
