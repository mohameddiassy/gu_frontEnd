import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';
import { ListejoursComponent } from '../listejours/listejours.component';

@Component({
  selector: 'app-liste-entree',
  templateUrl: './liste-entree.component.html',
  styleUrls: ['./liste-entree.component.css']
})
export class ListeEntreeComponent implements OnInit {
  jour:any
  date:any
  closeResult='';
  constructor(public api:ApiService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.recevoir_entree_par_jours_par_enregistreur()

  }
  clique(item:any){
    this.jour=item
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
        this.jour=this.api.global.entree_par_jours_par_enregistreur[0]
        this.api.sendEvent("entree_par_jours_par_enregistreur",this.jour)
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
  isIn(date_string:string):boolean{
    var res=false
    this.api.global.entree_par_jours_par_enregistreur.forEach((element:any) => {
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
    if (this.api.global.entree_par_jours_par_enregistreur.length>0 && this.isIn(date_string)){
      // on a deja un enregistrement pour aujourd'hui
      alert("La date choisie existe dèja")
    } else {
      console.log("pas d'enregistrement ")
      this.api.global.entree_par_jours_par_enregistreur.unshift({
          "date": date_string,
          "nombre": "0",
          "montant": "0"
      })
    }
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult)
      console.log(this.date)
      this.ajouter_nouvelle_date()
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult)
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
