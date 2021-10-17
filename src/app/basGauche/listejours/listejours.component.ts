import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-listejours',
  templateUrl: './listejours.component.html',
  styleUrls: ['./listejours.component.css']
})
export class ListejoursComponent implements OnInit {


  lecomponent=ListejoursComponent
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.recevoir_sortie_par_jours_par_enregistreur()
  }
  clique(item:any){
    this.api.sendEvent("sortie_par_jours_par_enregistreur",item)
    this.api.closeSidenav()
  }
  recevoir_sortie_par_jours_par_enregistreur(){
    this.api.post({get_sortie_par_jours_par_enregistreur:true,id_enregistreur:this.api.global.utilisateur_connecte.id_utilisateur}).subscribe((data:any)=>{
      console.log("sortie_par_jours_par_enregistreur= ",data)
      if (data.status) {
        this.api.global.sortie_par_jours_par_enregistreur=data.sortie_par_jours_par_enregistreur

        if (this.api.global.sortie_par_jours_par_enregistreur.length>0 && this.api.global.sortie_par_jours_par_enregistreur[0].date==moment().format("YYYY-MM-DD")) {
          // on a deja un enregistrement pour aujourd'hui
        } else {
          this.api.global.sortie_par_jours_par_enregistreur.unshift({
              "date": moment().format("YYYY-MM-DD"),
              "nombre": "0",
              "montant": "0"
          })
        }
        this.api.sendEvent("sortie_par_jours_par_enregistreur",this.api.global.sortie_par_jours_par_enregistreur[0])
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
}
