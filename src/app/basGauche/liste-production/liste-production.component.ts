import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-production',
  templateUrl: './liste-production.component.html',
  styleUrls: ['./liste-production.component.css']
})
export class ListeProductionComponent implements OnInit {

  les_productions:any=[]
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.recevoir_production_par_jours_par_enregistreur()

  }
  clique(item:any){
    this.api.sendEvent("item_liste_production",item)
    this.api.closeSidenav()
  }
  recevoir_production_par_jours_par_enregistreur(){
    this.api.post({get_production_par_jours_par_enregistreur:true,id_enregistreur:this.api.global.utilisateur_connecte.id_utilisateur}).subscribe((data:any)=>{
      console.log(data)
      if (data.status) {
        this.api.global.production_par_jours_par_enregistreur=data.production_par_jours_par_enregistreur

        if (this.api.global.production_par_jours_par_enregistreur.length>0 && this.api.global.production_par_jours_par_enregistreur[0].date==moment().format("YYYY-MM-DD")) {
          // on a deja un enregistrement pour aujourd'hui
        } else {
          console.log("pas d'enregistrement ")
          this.api.global.production_par_jours_par_enregistreur.unshift({
              "date": moment().format("YYYY-MM-DD"),
              "nombre": "0",
              "montant": "0"
          })
        }
        this.api.sendEvent("item_liste_production",this.api.global.production_par_jours_par_enregistreur[0])
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
}
