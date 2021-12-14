import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-depense',
  templateUrl: './ajouter-depense.component.html',
  styleUrls: ['./ajouter-depense.component.css']
})
export class AjouterDepenseComponent implements OnInit {
  jour:any
  depense:any={}
  modifier_bool=false
  succes=false
  echec=false
  constructor(public api:ApiService,private http:HttpClient) {
    api.getEvent().subscribe((data) => {
      if (data.code == "ajouter_depense") {
        this.succes = false
        this.echec = false
        this.depense={}
        this.modifier_bool=false
        this.jour=data.data
      } else if (data.code == "modifier_depense") {
        this.succes = false
        this.echec = false
        this.depense={}
        this.modifier_bool=true
        this.depense = Object.assign({},data.data.depense)
        this.jour=data.data.jour
      }
    })
   }

  ngOnInit(): void {
  }
  add_depense(){
    this.depense.id_entreprise=this.api.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise
    this.depense.id_enregistreur=this.api.global.utilisateur_connecte.id_utilisateur
    this.depense.date_enregistrement=moment().format( 'YYYY-MM-DD  HH:mm:ss' );
    this.depense.date_depense=moment(this.jour.date).format( 'YYYY-MM-DD  HH:mm:ss' );
    console.log(this.depense)
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in this.depense) {
      formdata.append(key,this.depense[key])
    }

    let api_url="http://localhost/gestionuniversel_back/amar_api/depense/add" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        alert("Opération effectuée avec succés sur la table depense")
        console.log("Opération effectuée avec succés sur la table depense. Réponse= ",reponse)
        this.depense.id_depense=reponse.id
        this.api.sendEvent("apres_ajout_depense",this.jour);
        this.depense={}
      }else{
        alert("L'opération sur la table depense a échoué")
        console.log("L'opération sur la table depense a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      alert("Erreur inconnue! ")
      console.log("Erreur inconnue! ",error)
    })
  }
  edit_depense(){
    this.depense.date_depense=moment(this.jour.date).format( 'YYYY-MM-DD  HH:mm:ss' );
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in this.depense) {
      formdata.append(key,this.depense[key])
    }

    let api_url="http://localhost/gestionuniversel_back/amar_api/depense/edit" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        alert("Opération effectuée avec succés sur la table depense")
        console.log("Opération effectuée avec succés sur la table depense. Réponse= ",reponse)
        this.api.sendEvent("item_liste_consommation",this.jour);
        this.depense={}
        this.api.closeAllBool()
      }else{
        console.log("L'opération sur la table depense a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
    })
  }

}
