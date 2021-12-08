import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-consommation',
  templateUrl: './liste-consommation.component.html',
  styleUrls: ['./liste-consommation.component.css']
})
export class ListeConsommationComponent implements OnInit {
  les_consommations:any=[]
  jour:any
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.consommation_par_jours_par_enregistreur()
  }
  clique(item:any){
    this.jour=item
    this.api.sendEvent("item_liste_consommation",item)
    this.api.closeSidenav()
  }
  consommation_par_jours_par_enregistreur(){
    this.api.post_utilisateur_connecte({get_consommation_par_jours_par_enregistreur:true}).subscribe((data:any)=>{
      console.log(data)
      if (data.status) {
        this.api.global.consommation_par_jours_par_enregistreur=data.consommation_par_jours_par_enregistreur

        if (this.api.global.consommation_par_jours_par_enregistreur.length>0 && this.api.global.consommation_par_jours_par_enregistreur[0].date==moment().format("YYYY-MM-DD")) {
          // on a deja un enregistrement pour aujourd'hui
        } else {
          console.log("pas d'enregistrement ")
          this.api.global.consommation_par_jours_par_enregistreur.unshift({
              "date": moment().format("YYYY-MM-DD"),
              "nombre": "0",
              "montant": "0"
          })
        }
        this.jour=this.api.global.consommation_par_jours_par_enregistreur[0]
        this.api.sendEvent("item_liste_consommation",this.jour)
      } else {
        alert("erreur coté serveur")
      }
    })
  }
}

