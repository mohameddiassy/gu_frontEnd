import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-dashbord',
  templateUrl: './liste-dashbord.component.html',
  styleUrls: ['./liste-dashbord.component.css']
})
export class ListeDashbordComponent implements OnInit {
  jour:any
  les_productions:any=[]
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.recevoir_production_par_jours_par_enregistreur()

  }
  clique(item:any){
    this.jour=item
    this.api.sendEvent("item_list_dashboard",item)
    this.api.closeSidenav()
  }
  recevoir_production_par_jours_par_enregistreur(){
    this.api.post_utilisateur_connecte({get_production_par_jours_par_enregistreur:true}).subscribe((data:any)=>{
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
        this.jour=this.api.global.production_par_jours_par_enregistreur[0]
        this.api.sendEvent("item_list_dashboard",this.jour)
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
}
