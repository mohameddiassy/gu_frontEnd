import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listejours',
  templateUrl: './listejours.component.html',
  styleUrls: ['./listejours.component.css']
})
export class ListejoursComponent implements OnInit {

  jour:any
  lecomponent=ListejoursComponent
  date: any;
  constructor(public api:ApiService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.recevoir_sortie_par_jours_par_enregistreur()
  }
  clique(item:any){
    this.jour=item
    this.api.sendEvent("sortie_par_jours_par_enregistreur",item)
    this.api.closeSidenav()
  }
  recevoir_sortie_par_jours_par_enregistreur(){
    this.api.post_utilisateur_connecte({get_sortie_par_jours_par_enregistreur:true}).subscribe((data:any)=>{
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
        this.jour=this.api.global.sortie_par_jours_par_enregistreur[0]
        this.api.sendEvent("sortie_par_jours_par_enregistreur",this.jour)
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
    if (this.api.global.sortie_par_jours_par_enregistreur.length>0 && this.isIn(this.api.global.sortie_par_jours_par_enregistreur,date_string)){
      // on a deja un enregistrement pour aujourd'hui
      alert("La date choisie existe dèja")
    } else {
      console.log("pas d'enregistrement ")
      this.api.global.sortie_par_jours_par_enregistreur.unshift({
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
