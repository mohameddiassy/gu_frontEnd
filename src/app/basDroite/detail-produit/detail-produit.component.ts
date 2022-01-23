import { Component, OnInit } from '@angular/core';
import { AjouterProduitComponent } from '../../modal/ajouter-produit/ajouter-produit.component';
import { ApiService } from 'src/app/service/api.service';
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
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="item_liste_produit"){
        this.produit=data.data
        this.recevoir_entree_par_jours_par_enregistreur()
      }else if(data.code=="apres_ajout_consommation"){
        this.recevoir_details(this.jour["date"])
      }else if(data.code=="apres_modification_consommation"){
        this.recevoir_details(this.jour["date"])
      }else if(data.code=="apres_ajout_entree"){
        this.recevoir_details(this.jour["date"])
      }else if(data.code=="apres_modification_entree"){
        this.recevoir_details(this.jour["date"])
      }
    })
  }
  ngOnInit(): void {
    
  }
  ajouter_produit(){
    this.api.closeAllBool()
    this.api.bool.ajouterproduit=!this.api.bool.ajouterproduit
    this.api.sendEvent("ajouter_produit",this.produit);
  }
  
  modifier_produit(){
    this.api.closeAllBool()
    this.api.bool.ajouterproduit=!this.api.bool.ajouterproduit
    // var p=Object.assign({},this.produit)
    this.api.sendEvent("modifier_produit",this.produit);
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
  
  supression_produit(){
    this.api.post_utilisateur_connecte({delete_produit:true,id_produit:this.produit.id_produit}).subscribe((data:any)=>{
      console.log("Supression de produit: ",data)
      if(data.status){
        alert("Produit désactivé avec succés")
        this.produit.etat=-1
      }else{
        alert("Echec de supression")
      }
    })
  }
  ajouter_consommation(){
    this.api.closeAllBool()
    this.api.bool.ajouterconsommation=!this.api.bool.ajouterconsommation
    this.api.sendEvent("ajouterconsommation",{jour:this.jour,id_produit:this.produit.id_produit,id_produit_destination:0});
  }
  ajouter_entree(){
      this.api.bool.ajouterentree=!this.api.bool.ajouterentree
      this.api.sendEvent("ajouterentree",{jour:this.jour,id_produit:this.produit.id_produit});
  }
  supprimer_entree(item:any){

  }
  modifier_entree(une_entree:any){
    this.api.closeAllBool()
    this.api.bool.ajouterentree=!this.api.bool.ajouterentree
    this.api.sendEvent("modifierentree",[une_entree, this.jour]);
  }
  modifier_consommation(consommation:any){
    this.api.closeAllBool()
    this.api.bool.ajouterconsommation=!this.api.bool.ajouterconsommation
    this.api.sendEvent("modifierconsommation",[this.jour, consommation]);
  }
  supprimer_consommation(produit:any)
  {
    console.log("donnee send",produit);
    this.api.post_utilisateur_connecte({delete_consommation:true,id_consommation:produit.id_consommation}).subscribe((data:any)=>{
      if (data.status) {
        alert("Produit supprimé avec succes")
        this.les_details.consommation.splice(this.les_details.consommation.indexOf(produit),1)  
      } else {
        alert("Echec de suppression")
      }
      console.log("status",data)
    })
  }
}

