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
  ajoutersortiecomponent=AjouterSortieComponent
  recherche=""
  item:any
  constructor(public data:DataService) {
    this.item=data.les_mois[0]   
    data.getEvent().subscribe((data)=>{
      this.item=data.item
      this.data.recevoir_sortiesMois(this.item.date)
    })
  }

  ngOnInit(): void {
    this.data.recevoir_sortiesMois(this.item.date)
  }

  ajoutersortie(){
    this.data.sendCloseClick()
  }

}
