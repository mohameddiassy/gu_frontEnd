import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajout-dette',
  templateUrl: './ajout-dette.component.html',
  styleUrls: ['./ajout-dette.component.css']
})
export class AjoutDetteComponent implements OnInit {
  fournisseur:any
  dette:any={}
  modifier_bool=false
  succes=false
  echec=false
  constructor(public api:ApiService,private http:HttpClient) {
    api.getEvent().subscribe((data) => {
      if (data.code == "ajouter_dette") {
        this.succes = false
        this.echec = false
        this.modifier_bool=false
        this.fournisseur=data.data
      } else if (data.code == "modifier_dette") {
        this.succes = false
        this.echec = false
        this.modifier_bool=true
        this.dette = Object.assign({},data.data.dette)
        this.fournisseur=data.data.fournisseur
      }
    })
   }

  ngOnInit(): void {
  }
  add_dette(){
    /*
    dette:any={
      id_dette:'int(255) (primary key)',
montant:'float',
date_echeance:'int(11)',
date_enregistrement:'datetime',
status:'int(1)'
    }
    */
    this.dette.id_entreprise=this.api.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise
    this.dette.id_fournisseur=this.fournisseur.id_fournisseur
    this.dette.date_enregistrement=moment().format( 'YYYY-MM-DD  HH:mm:ss' );
    console.log(this.dette)
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in this.dette) {
      formdata.append(key,this.dette[key])
    }

    let api_url=this.api.host+"amar_api/dette/add" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        alert("Opération effectuée avec succés sur la table dette")
        console.log("Opération effectuée avec succés sur la table dette. Réponse= ",reponse)
        this.dette.id_dette=reponse.id
        this.api.sendEvent("apres_ajouter_dette",Object.assign({},this.dette));
        this.dette={}
      }else{
        alert("L'opération sur la table dette a échoué")
        console.log("L'opération sur la table dette a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      alert("Erreur inconnue! ")
      console.log("Erreur inconnue! ",error)
    })
  }
  edit_dette(){
    /*
    dette:any={
      id_dette:'int(255) (primary key, obligatoire)',
      montant:'float (obligatoire)',
      date_echeance:'int(11) (obligatoire)',
      date_enregistrement:'datetime (obligatoire)',
      status:'int(1) (obligatoire)'
    }
    */
   this.dette.id_entreprise=this.api.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise
   this.dette.id_fournisseur=this.fournisseur.id_fournisseur
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in this.dette) {
      formdata.append(key,this.dette[key])
    }

    let api_url=this.api.host+"amar_api/dette/edit" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        alert("Opération effectuée avec succés sur la table dette")
        console.log("Opération effectuée avec succés sur la table dette. Réponse= ",reponse)
        this.api.sendEvent("item_liste_fournisseur",this.fournisseur);
        this.dette={}
        this.api.closeAllBool()
      }else{
        console.log("L'opération sur la table dette a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
    })
  }

}
