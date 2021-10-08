import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AjouterSortieComponent } from '../ajouter-sortie/ajouter-sortie.component';
import { DataService } from '../data.service';
import { SortieComponent } from '../sortie/sortie.component';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-sortie-mois',
  templateUrl: './sortie-mois.component.html',
  styleUrls: ['./sortie-mois.component.css']
})
export class SortieMoisComponent implements OnInit {
  fileName= 'rapport_mensuel.xlsx';

  ajoutersortiecomponent=AjouterSortieComponent
  recherche=""
  item:any
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

