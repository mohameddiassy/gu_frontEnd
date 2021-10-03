import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

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
  constructor(public data:DataService) { 
    data.getEvent().subscribe((data:any)=>{
      console.log("data data ",data)
      this.item=data.item
    })
    data.getBasGaucheClick().subscribe((data:any)=>{
      console.log("data data ",data)
      this.item=data.item

    })
  }

  ngOnInit(): void {
    this.data.recevoir_produit_entreprise(11,(data:any)=>{
      
    })
  }
  ajouter(){
    this.sortie.date_sortie=this.item.date
    console.log("sortie= ",this.sortie)
    if (this.sortie.id_produit=="0") {
      console.log("choisir un produit")
    } else {
      this.data.requete_post("add_sortie.php",{sortie:JSON.stringify(this.sortie)},(data:any)=>{
        if (data.status) {
          this.succes=true
          this.sortie.quantite=""
          // this.data.les_produits.push(data.produit)
          let date=moment(this.item.date).format("YYYY-MM-DD")
          this.data.recevoir_sorties(date)
        } else {
          this.echec=false
        }
      })
    }
  }
  changement(){

  }
  close(){
    this.data.bool.ajoutersortie=!this.data.bool.ajoutersortie
  }

}
