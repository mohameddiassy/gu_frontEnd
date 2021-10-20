import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjouterEntreeComponent } from 'src/app/modal/ajouter-entree/ajouter-entree.component';
import { AjouterFournisseurComponent } from 'src/app/modal/ajouter-fournisseur/ajouter-fournisseur.component';
import { AjouterSortieComponent } from 'src/app/modal/ajouter-sortie/ajouter-sortie.component';
import { ApiService } from 'src/app/service/api.service';
import * as XLSX from 'xlsx';
import { FournisseurComponent } from '../fournisseur/fournisseur.component';
import { SortieComponent } from '../sortie/sortie.component';

@Component({
  selector: 'app-entree',
  templateUrl: './entree.component.html',
  styleUrls: ['./entree.component.css']
})
export class EntreeComponent implements OnInit {
  les_entree:any=[]
  fileName= 'rapport_journalier.xlsx';
  item:any={}
  lecomponent=SortieComponent
  ajouterentreecomponent=AjouterEntreeComponent
  ajouterfournisseur=AjouterFournisseurComponent

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
      if(data.code=="entree_par_jours_par_enregistreur"){
        this.item=data.data
        this.recevoir_entree(data.data.date)
      }
    })
  }

  ngOnInit(): void {
  }

  ajouterentree(){
    this.api.bool.ajouterentree=!this.api.bool.ajouterentree
    this.api.sendEvent("ajouterentree",this.item);
  }
  modifier_sortie(une_sortie:any){
    // this.data.bool.modifiersortie=!this.data.bool.modifiersortie
    // this.data.sendCode("modifier_sortie",une_sortie);
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

  recevoir_entree(date:string){
    this.api.post({get_entree_date:true,id_utilisateur:1,date:date}).subscribe((data:any)=>{
      this.les_entree=data.les_produits
      console.log("get_entree_date",data)
    })
  }
}
