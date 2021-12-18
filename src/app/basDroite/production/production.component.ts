import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjouterSortieComponent } from '../../modal/ajouter-sortie/ajouter-sortie.component';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/service/api.service';
import { AjouterProductionComponent } from 'src/app/modal/ajouter-production/ajouter-production.component';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  closeResult = '';

  les_productions:any=[]
  fileName= 'rapport_journalier.xlsx';
  item:any={}
  clicksuscription: Subscription = new Subscription;
  recherche=""
  pageSize=5
  page=1
  les_statistiques:any=[
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Stock initial",chiffre:12,bg:"secondary"},
    {nom:"Stock Final",chiffre:12,bg:"success"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
  ]
  id_produit_supprime: any;
  constructor(public api:ApiService,private modalService: NgbModal) {
    api.getEvent().subscribe((data)=>{
      if(data.code=="item_liste_production"){
        this.item=data.data
        this.recevoir_productions(data.data.date)
      }else if(data.code=="apres_ajout_production"){
        this.recevoir_productions(data.data.date)
      }else if(data.code=="apres_modification_production"){
        this.recevoir_productions(data.data.date)
      }

    })
  }

  ngOnInit(): void {
  }

  ajouter(){
    this.api.closeAllBool()
    this.api.bool.ajouterproduction=!this.api.bool.ajouterproduction
    this.api.sendEvent("ajouterproduction",{jour:this.item,id_produit:0});
  }

  modifier_production(production:any){
    this.api.closeAllBool()
    this.api.bool.ajouterproduction=!this.api.bool.ajouterproduction
    this.api.sendEvent("modifierproduction",[this.item,production]);
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
    this.api.post_utilisateur_connecte({get_production_date:true,date:date}).subscribe((data:any)=>{
      this.api.global.les_productions=data.les_productions
      console.log("get_production_date",data)
    })
  }

  modifier_consommation(une_entree:any){
    this.api.bool.ajouterentree=!this.api.bool.ajouterentree
     this.api.sendEvent("modifierentree",une_entree);
  }

  open(content:any,sortie:any) {
    this.id_produit_supprime=sortie

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  suppression(id_production:any)
  {
    console.log("donnee send",id_production);
    this.api.post_utilisateur_connecte({delete_production:true,id_production:id_production}).subscribe((data:any)=>{

      if(data.status){
        alert("Suppression reussie !")
        this.recevoir_productions(this.item.date)
      }else{
        alert("Echec de la suppression")
      }
    })
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}


