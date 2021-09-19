import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ajouter-entreprise',
  templateUrl: './ajouter-entreprise.component.html',
  styleUrls: ['./ajouter-entreprise.component.css']
})
export class AjouterEntrepriseComponent implements OnInit {

  infos_form:any={}
  
  succes=false
  echec=false
  constructor(public data:DataService) { }

  ngOnInit(): void {
  }
  inscrire(){
    console.log("les informations du formulaire sont: ",this.infos_form)
    this.data.requete_post("info_entreprise.php",{utilisateur:JSON.stringify(this.infos_form)},(data:any)=>{
      if (data.status) {
        this.succes=true
        this.infos_form={}
      } else {
        this.echec=false
      }
    })
  }
}

