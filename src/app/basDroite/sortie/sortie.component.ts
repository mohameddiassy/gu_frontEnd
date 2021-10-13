import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AjouterSortieComponent } from '../../ajouter-sortie/ajouter-sortie.component';
import { DataService } from '../../service/data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent implements OnInit {
  fileName= 'rapport_journalier.xlsx';

  lecomponent=SortieComponent
  ajoutersortiecomponent=AjouterSortieComponent
  clicksuscription: Subscription = new Subscription;
  item:any
  recherche=""
  les_statistiques:any=[
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Stock initial",chiffre:12,bg:"secondary"},
    {nom:"Stock Final",chiffre:12,bg:"success"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
  ]
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
  exportexcel(): void
  {
     /* table id is passed over here */
     let element = document.getElementById('excel-table');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     /* save to file */
     XLSX.writeFile(wb, this.fileName);

  }
}
