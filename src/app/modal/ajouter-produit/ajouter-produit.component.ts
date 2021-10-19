import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {
  produit:any={}
  default_formulaire:any={nom:"",description:"",id_categorie:null,stock:0,prix_unitaire:0}
  succes=false
  echec=false
  id_entreprise:number=0
  modifier_bool=false
  constructor(public api:ApiService) { 
    api.getEvent().subscribe((data:any)=>{
      if (data.code=="modifier_produit") {
        this.produit=data.data
        this.modifier_bool=true
      } else if (data.code=="ajouter_produit") {
        this.modifier_bool=false
      } else {
        this.initialiser_formulaire()
      }
    })
    
  }

  ngOnInit(): void {
    this.recevoir_categorie()
  }
  initialiser_formulaire(){
    this.produit.nom=""
    this.produit.description=""
    this.produit.stock=0
    this.produit.prix_unitaire=0
    this.produit.nom_new_categorie=""
    this.produit.description_new_categorie=""
    this.produit.id_categorie=1
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
    this.succes=false
    this.echec=false
    console.log(this.produit)
    this.api.post({add_product:true,produit:JSON.stringify(this.produit)}).subscribe((data:any)=>{
      console.log(data)
      if (data.status) {
        this.succes=true
        if(this.produit.categorie=="nouvelle_categorie"){
          this.produit.categorie=undefined
          this.recevoir_categorie()
        }
        // mettre à jour la liste des produits en fonction du type
        if (this.produit.type=="entrant") {
          this.recevoir_produit_entrant()
        } else if (this.produit.type=="sortant") {
          this.recevoir_produit_sortant()
        }
        this.initialiser_formulaire()
      } else {
        this.echec=true
      }
    })
  }
  close(){
    this.api.bool.ajouterproduit=false
  }
  recevoir_produit_entrant(){
    this.api.post({get_products_by_id_entreprise:true,type:"entrant",id_entreprise:1}).subscribe((data:any)=>{
      this.api.global.les_produits_entrants=data.les_produits
    })
  }
  recevoir_produit_sortant(){
    this.api.post({get_products_by_id_entreprise:true,type:"sortant",id_entreprise:1}).subscribe((data:any)=>{
      this.api.global.les_produits_sortants=data.les_produits
    })
  }
  modifier(){
    this.produit.id_enregistreur=1
    this.produit.id_entreprise=1
    this.succes=false
    this.echec=false
    console.log(this.produit)
    this.api.post({modifier_produit:true,produit:JSON.stringify(this.produit)}).subscribe((data:any)=>{
      console.log(data)
      if (data.status) {
        this.succes=true
        this.api.sendEvent("item_liste_produit",Object.assign({},this.produit))
        this.close()
        // mettre à jour la liste des produits en fonction du type
        if (this.produit.type=="entrant") {
          this.recevoir_produit_entrant()
        } else if (this.produit.type=="sortant") {
          this.recevoir_produit_sortant()
        }
        this.initialiser_formulaire()
      } else {
        this.echec=true
      }
    })
  }
}
