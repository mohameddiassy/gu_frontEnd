import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ajouter-gerant',
  templateUrl: './ajouter-gerant.component.html',
  styleUrls: ['./ajouter-gerant.component.css']
})
export class AjouterGerantComponent implements OnInit {

  infos_form:any={prenom:"",nom:"",email:"",telephone:"",profession:"",login:"",mot_de_passe:""}
  constructor(public data:DataService) { }
  succes=false
  echec=false


  ngOnInit(): void {
  }
  inscrire(){
    console.log("les informations du formulaire sont: ",this.infos_form)
    this.data.requete_post("ajout_utilisateur.php",{inscription:JSON.stringify(this.infos_form)},(data:any)=>{

    })
  }
}
