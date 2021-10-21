import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjouterSortieComponent } from '../../modal/ajouter-sortie/ajouter-sortie.component';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/service/api.service';
import { AjouterProductionComponent } from 'src/app/modal/ajouter-production/ajouter-production.component';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  les_productions:any=[]
  fileName= 'rapport_journalier.xlsx';
  item:any={}
  ajouterproductioncomponent=AjouterProductionComponent
  clicksuscription: Subscription = new Subscription;
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
  constructor(public api:ApiService) {
    api.getEvent().subscribe((data)=>{
      if(data.code=="item_production"){
        this.item=data.data
        this.recevoir_productions(data.data.date)
      }
    })
  }

  ngOnInit(): void {
  }

  ajouter(){
    this.api.closeAllBool()
    this.api.bool.ajouterproduction=!this.api.bool.ajouterproduction
    this.api.sendEvent("ajouterproduction",this.item);
  }
  modifier_production(production:any){
    this.api.closeAllBool()
    this.api.bool.ajouterproduction=!this.api.bool.ajouterproduction
    this.api.sendEvent("ajouterproduction",production);
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
  
  recevoir_productions(date:string){
    this.api.post({get_production:true,id_utilisateur:1,date:date}).subscribe((data:any)=>{
      this.les_productions=data.les_productions
      console.log("get_sortie_date",data)
    })
  }
}

