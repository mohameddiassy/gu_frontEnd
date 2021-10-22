import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/service/api.service';
import { AjouterConsommationComponent } from 'src/app/modal/ajouter-consommation/ajouter-consommation.component';


@Component({
  selector: 'app-consommation',
  templateUrl: './consommation.component.html',
  styleUrls: ['./consommation.component.css']
})
export class ConsommationComponent implements OnInit {

 
  les_consommations:any=[]
  fileName= 'rapport_journalier.xlsx';
  item:any={}
  ajouterconsommationcomponent=AjouterConsommationComponent
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
      if(data.code=="item_liste_consommation"){
        this.item=data.data
        this.recevoir_consommations(data.data.date)
      }
    })
  }

  ngOnInit(): void {
  }

  ajouter(){
    this.api.closeAllBool()
    this.api.bool.ajouterconsommation=!this.api.bool.ajouterconsommation
    this.api.sendEvent("ajouterconsommation",this.item);
  }
  modifier_consommation(consommation:any){
    this.api.closeAllBool()
    this.api.bool.ajouterconsommation=!this.api.bool.ajouterconsommation
    this.api.sendEvent("modifierconsommation",consommation);
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
  
  recevoir_consommations(date:string){
    this.api.post({get_consommation_date:true,id_utilisateur:1,date:date}).subscribe((data:any)=>{
      this.les_consommations=data.les_consommations
      console.log("get_consommation_date",data)
    })
  }
}

