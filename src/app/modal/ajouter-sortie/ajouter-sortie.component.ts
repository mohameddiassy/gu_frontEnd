import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-sortie',
  templateUrl: './ajouter-sortie.component.html',
  styleUrls: ['./ajouter-sortie.component.css']
})
export class AjouterSortieComponent implements OnInit {
  sortie={quantite:"",id_produit:"0",id_enregistreur:1,date_sortie:""}
  option="2"
  succes=false
  echec=false
  item:any
  constructor(public api:ApiService) { 
    api.getEvent().subscribe((data)=>{
      if(data.code=="ajoutersortie"){
        this.item=data.data
      }
    })
  }

  ngOnInit(): void {
  }
  ajouter(){
    this.sortie.date_sortie=this.item.date
    console.log("sortie= ",this.sortie)
    if (this.sortie.id_produit=="0") {
      console.log("choisir un produit")
    } else {
      this.api.post({sortie:JSON.stringify(this.sortie)}).subscribe((data:any)=>{
        if (data.status) {
          this.succes=true
          this.sortie.quantite=""
          // this.data.les_produits.push(data.produit)
          // let date=moment(this.item.date).format("YYYY-MM-DD")
          // this.data.recevoir_sorties(date)
        } else {
          this.echec=false
        }
      })
    }
  }
  changement(){

  }

}
