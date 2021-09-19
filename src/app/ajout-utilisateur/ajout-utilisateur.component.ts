import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.css']
})
export class AjoutUtilisateurComponent implements OnInit {
  infos_form:any={}
  succes=false
  echec=false
  
    constructor(public data:DataService) { }

  ngOnInit(): void {
  }
  inscrire(){
    console.log("les informations du formulaire sont: ",this.infos_form)
    this.data.requete_post("inscription.php",{utilisateur:JSON.stringify(this.infos_form)},(data:any)=>{
      if (data.status) {
        this.succes=true
        this.infos_form={}
      } else {
        this.echec=false
      }
    })
  }

}
