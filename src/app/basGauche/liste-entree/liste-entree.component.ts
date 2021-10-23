import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';
import { ListejoursComponent } from '../listejours/listejours.component';

@Component({
  selector: 'app-liste-entree',
  templateUrl: './liste-entree.component.html',
  styleUrls: ['./liste-entree.component.css']
})
export class ListeEntreeComponent implements OnInit {

  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.recevoir_entree_par_jours_par_enregistreur()

  }
  clique(item:any){
    this.api.sendEvent("entree_par_jours_par_enregistreur",item)
    this.api.closeSidenav()
  }
  recevoir_entree_par_jours_par_enregistreur(){
    this.api.post_utilisateur_connecte({get_entree_par_jours_par_enregistreur:true}).subscribe((data:any)=>{
     console.log("llll",data);
      if (data.status) {
        this.api.global.entree_par_jours_par_enregistreur=data.entree_par_jours_par_enregistreur

        if (this.api.global.entree_par_jours_par_enregistreur.length>0 && this.api.global.entree_par_jours_par_enregistreur[0].date==moment().format("YYYY-MM-DD")) {
          // on a deja un enregistrement pour aujourd'hui
        } else {
          console.log("pas d'enregistrement ")
          this.api.global.entree_par_jours_par_enregistreur.unshift({
              "date": moment().format("YYYY-MM-DD"),
              "nombre": "0",
              "montant": "0"
          })
        }
        this.api.sendEvent("entree_par_jours_par_enregistreur",this.api.global.entree_par_jours_par_enregistreur[0])
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
}
