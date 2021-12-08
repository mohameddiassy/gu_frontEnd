import { Component, OnInit } from '@angular/core';
import { AjouterProduitComponent } from '../../modal/ajouter-produit/ajouter-produit.component';
import { ApiService } from 'src/app/service/api.service';
import { multi } from './data';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  produit:any
  ajouterproduitcomponent=AjouterProduitComponent
  les_details: any;
  les_statistiques:any=[]
  jour:any
  constructor(public api:ApiService) { 
    // this.produit=this.api.global.les_produits[0]
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="item_liste_produit"){
        this.produit=data.data
        this.recevoir_entree_par_jours_par_enregistreur()
      }
    })
  }
  ngOnInit(): void {}
  ajouter_produit(){
    this.api.closeAllBool()
    this.api.bool.ajouterproduit=!this.api.bool.ajouterproduit
    this.api.sendEvent("ajouter_produit",this.produit);
  }
  
  modifier_produit(){
    this.api.closeAllBool()
    this.api.bool.ajouterproduit=!this.api.bool.ajouterproduit
    var p=Object.assign({},this.produit)
    this.api.sendEvent("modifier_produit",p);
  }
  recevoir_details(date:string){
    this.api.post_utilisateur_connecte({details_produits_entrant:true,date:date,id_produit:this.produit.id_produit}).subscribe((data:any)=>{
      this.les_details=data
      console.log("details_produits_sortant: ",data)
    })
  }
  
  recevoir_entree_par_jours_par_enregistreur(){
    this.api.post_utilisateur_connecte({get_entree_par_jours_par_enregistreur:true}).subscribe((data:any)=>{
      console.log(data)
      if (data.status) {
        this.api.global.entree_par_jours_par_enregistreur=data.entree_par_jours_par_enregistreur

        if (this.api.global.entree_par_jours_par_enregistreur.length>0 && this.api.global.entree_par_jours_par_enregistreur[0].date==moment().format("YYYY-MM-DD")) {
          // on a deja un enregistrement pour aujourd'hui
        } else {
          console.log("pas d'enregistrement pour aujourd'hui")
          this.api.global.entree_par_jours_par_enregistreur.unshift({
              "date": moment().format("YYYY-MM-DD"),
              "nombre": "0",
              "montant": "0"
          })
        }
        this.jour=this.api.global.entree_par_jours_par_enregistreur[0]
        this.recevoir_details(this.jour["date"])
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
  get_sum_consommation(){
    var somme=0
    this.les_details?.consommation.forEach((element:any) => {
      somme+=(element.quantite*element.prix_unitaire)
    });
    return somme
  }
  get_sum_entree(){
    var somme=0
    this.les_details?.entree.forEach((element:any) => {
      somme+=(element.quantite*element.prix_unitaire)
    });
    return somme
  }
  get_quantite_totale_entree(){
    var somme=0
    this.les_details?.production.forEach((element:any) => {
      somme+=parseFloat( element.quantite)
    });
    return somme
  }
  get_prix_revient(){
    return 0
  }
  choisir_jour(item:any){
    this.jour=item
    this.recevoir_details(this.jour["date"])
  }
}

