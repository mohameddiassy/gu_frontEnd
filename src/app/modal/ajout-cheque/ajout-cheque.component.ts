import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajout-cheque',
  templateUrl: './ajout-cheque.component.html',
  styleUrls: ['./ajout-cheque.component.css']
})
export class AjoutChequeComponent implements OnInit {
  fournisseur:any
  cheque:any={}
  modifier_bool=false
  succes=false
  echec=false
  constructor(public api:ApiService,private http:HttpClient) {
    api.getEvent().subscribe((data) => {
      this.succes = false
      this.echec = false
      if (data.code == "ajouter_cheque") {
        this.modifier_bool=false
        this.fournisseur=data.data
      } else if (data.code == "modifier_cheque") {
        this.modifier_bool=true
        this.cheque = Object.assign({},data.data.cheque)
        this.fournisseur=data.data.fournisseur
      }
    })
   }

  ngOnInit(): void {
  }
  add_cheque(){
    /*
    cheque:any={
      id_cheque:'int(255) (primary key)',
montant:'float',
date_echeance:'int(11)',
date_enregistrement:'datetime',
status:'int(1)'
    }
    */
    this.cheque.id_entreprise=this.api.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise
    this.cheque.id_fournisseur=this.fournisseur.id_fournisseur
    this.cheque.date_enregistrement=moment().format( 'YYYY-MM-DD  HH:mm:ss' );
    console.log(this.cheque)
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in this.cheque) {
      formdata.append(key,this.cheque[key])
    }

    let api_url="http://localhost/gestionuniversel_back/amar_api/cheque/add" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        alert("Opération effectuée avec succés sur la table cheque")
        console.log("Opération effectuée avec succés sur la table cheque. Réponse= ",reponse)
        this.cheque.id_cheque=reponse.id
        this.api.sendEvent("apres_ajouter_cheque",Object.assign({},this.cheque));
        this.cheque={}
      }else{
        alert("L'opération sur la table cheque a échoué")
        console.log("L'opération sur la table cheque a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      alert("Erreur inconnue! ")
      console.log("Erreur inconnue! ",error)
    })
  }
  edit_cheque(){
    /*
    cheque:any={
      id_cheque:'int(255) (primary key, obligatoire)',
      montant:'float (obligatoire)',
      date_echeance:'int(11) (obligatoire)',
      date_enregistrement:'datetime (obligatoire)',
      status:'int(1) (obligatoire)'
    }
    */
   this.cheque.id_entreprise=this.api.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise
   this.cheque.id_fournisseur=this.fournisseur.id_fournisseur
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in this.cheque) {
      formdata.append(key,this.cheque[key])
    }

    let api_url="http://localhost/gestionuniversel_back/amar_api/cheque/edit" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        alert("Opération effectuée avec succés sur la table cheque")
        console.log("Opération effectuée avec succés sur la table cheque. Réponse= ",reponse)
        this.api.sendEvent("item_liste_fournisseur",this.fournisseur);
        this.cheque={}
        this.api.closeAllBool()
      }else{
        console.log("L'opération sur la table cheque a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
    })
  }

}
