import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AjouterSortieComponent } from '../ajouter-sortie/ajouter-sortie.component';
import { DataService } from '../data.service';
import { SortieComponent } from '../sortie/sortie.component';

@Component({
  selector: 'app-sortie-mois',
  templateUrl: './sortie-mois.component.html',
  styleUrls: ['./sortie-mois.component.css']
})
export class SortieMoisComponent implements OnInit {
  lecomponent=SortieComponent
  ajoutersortiecomponent=AjouterSortieComponent
  item:any
  recherche=""
  constructor(public data:DataService) {
    // this.clicksuscription=data.getBasGaucheClick().subscribe((data:any)=>{
    //   this.item=data
    //   let date=moment(this.item.date).format("YYYY-MM-DD")
    //   this.data.recevoir_sorties(date)
    // })
    this.item=this.data.les_jours[0]
    data.getEvent().subscribe((data)=>{
      this.item=data.item

      let date=moment(this.item.date).format("YYYY-MM-DD")
      console.log("date    date "+date)
      this.data.recevoir_sortiesMois(date)

    })
  }

  ngOnInit(): void {

  }

  ajoutersortie(){
    this.data.sendCloseClick()
  }

}
