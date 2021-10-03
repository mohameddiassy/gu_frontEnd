import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AjouterSortieComponent } from '../ajouter-sortie/ajouter-sortie.component';
import { DataService } from '../data.service';
import { ModifieProduitComponent } from '../modifie-produit/modifie-produit.component';

@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent implements OnInit {
  lecomponent=SortieComponent
  ajoutersortiecomponent=AjouterSortieComponent
  clicksuscription: Subscription = new Subscription;
  item:any
  recherche=""
  constructor(public data:DataService) {
    this.item=data.les_jours[0]
    data.getEvent().subscribe((data)=>{
      this.item=data.item
      let date=moment(this.item?.date).format("YYYY-MM-DD")
      this.data.recevoir_sorties(date)
    })
  }

  ngOnInit(): void {

  }

  ajoutersortie(){
    this.data.bool.ajoutersortie=!this.data.bool.ajoutersortie
    this.data.sendCode("ajoutersortie",{});
  }
  modifier_sortie(une_sortie:any){
    this.data.bool.modifiersortie=!this.data.bool.modifiersortie
    this.data.sendCode("modifier_sortie",une_sortie);
  }

  downloadFile(data: any) {
    const replacer = (key:any, value:any) => (value === null ? '' : value);
    const header = Object.keys(data[0]);
    const csv = data.map((row: any ) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');


    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'journalier.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
