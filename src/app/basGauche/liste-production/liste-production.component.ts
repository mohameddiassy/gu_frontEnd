import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-production',
  templateUrl: './liste-production.component.html',
  styleUrls: ['./liste-production.component.css']
})
export class ListeProductionComponent implements OnInit {
  jour:any
  les_productions:any=[]
  date: any;
  constructor(public api:ApiService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.recevoir_production_par_jours_par_enregistreur()

  }
  clique(item:any){
    this.jour=item
    this.api.sendEvent("item_liste_production",item)
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
        this.api.sendEvent("item_liste_production",this.jour)
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
  isIn(array:any,date_string:string):boolean{
    var res=false
    array.forEach((element:any) => {
      console.log(element.date," et ",date_string)
      if(moment(element.date).format("YYYY-MM-DD")==moment(date_string).format("YYYY-MM-DD")){
        res=true
        return
      }
    });
    return res
  }
  ajouter_nouvelle_date(){
    var date_string=this.date.year+"-"+this.date.month+"-"+this.date.day
    if (this.api.global.production_par_jours_par_enregistreur.length>0 && this.isIn(this.api.global.production_par_jours_par_enregistreur,date_string)){
      // on a deja un enregistrement pour aujourd'hui
      alert("La date choisie existe dèja")
    } else {
      console.log("pas d'enregistrement ")
      this.api.global.production_par_jours_par_enregistreur.unshift({
          "date": date_string,
          "nombre": "0",
          "montant": "0"
      })
    }
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.ajouter_nouvelle_date()
    }, (reason:any) => {
    });
  }
}
