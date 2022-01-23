import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  date:any
  constructor(public api:ApiService,private modalService: NgbModal) { }

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
        this.jour?this.api.sendEvent("item_liste_consommation",this.jour):alert("date inexistante")
      } else {
        alert("erreur coté serveur")
      }
    })
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(this.date)
      this.ajouter_nouvelle_date()
    }, (reason:any) => {
    });
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
    if (this.api.global.consommation_par_jours_par_enregistreur.length>0 && this.isIn(this.api.global.consommation_par_jours_par_enregistreur,date_string)){
      // on a deja un enregistrement pour aujourd'hui
      alert("La date choisie existe dèja")
    } else {
      console.log("pas d'enregistrement ")
      this.api.global.consommation_par_jours_par_enregistreur.unshift({
          "date": date_string,
          "nombre": "0",
          "montant": "0"
      })
    }
  }
}

