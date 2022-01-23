import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjouterEntreeComponent } from 'src/app/modal/ajouter-entree/ajouter-entree.component';
import { AjouterFournisseurComponent } from 'src/app/modal/ajouter-fournisseur/ajouter-fournisseur.component';
import { ApiService } from 'src/app/service/api.service';
import * as XLSX from 'xlsx';
import { SortieComponent } from '../sortie/sortie.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-entree',
  templateUrl: './entree.component.html',
  styleUrls: ['./entree.component.css']
})
export class EntreeComponent implements OnInit {
  page=1
  pageSize=10
  les_entree:any=[]
  fileName= 'rapport_journalier.xlsx';
  item:any={}
  lecomponent=SortieComponent
  ajouterentreecomponent=AjouterEntreeComponent
  ajouterfournisseur=AjouterFournisseurComponent

  clicksuscription: Subscription = new Subscription;
  recherche=""
  closeResult = '';
  produit_supprime:any

  les_statistiques:any=[
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Stock initial",chiffre:12,bg:"secondary"},
    {nom:"Stock Final",chiffre:12,bg:"success"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:12,bg:"primary"},
  ]
  constructor(public api:ApiService,private modalService: NgbModal) {
    api.getEvent().subscribe((data)=>{
      if(data.code=="entree_par_jours_par_enregistreur"){
        this.item=data.data
        this.recevoir_entree(this.item.date)
      }else if(data.code=="apres_ajout_entree"){
        this.recevoir_entree(this.item.date)
      }else if(data.code=="apres_modification_entree"){
        this.recevoir_entree(this.item.date)
      }
    })
  }

  ngOnInit(): void {
  }

  ajouterentree(){
    this.api.bool.ajouterentree=!this.api.bool.ajouterentree
    this.api.sendEvent("ajouterentree",{jour:this.item,id_produit:0});
  }
  modifier_entree(une_entree:any){
    this.api.closeAllBool()
    this.api.bool.ajouterentree=!this.api.bool.ajouterentree
     this.api.sendEvent("modifierentree",[une_entree, this.item]);
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
    this.api.post_utilisateur_connecte({get_entree_date:true,date:date}).subscribe((data:any)=>{
      this.les_entree=data.les_produits
      console.log("get_entree_date",data)
    })
  }


  open(content:any,entree:any) {
    this.produit_supprime=entree

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  suppression(produit:any)
  {
    console.log("donnee send",produit);
    this.api.post_utilisateur_connecte({delete_entree:true,id_entree:produit.id_entree}).subscribe((data:any)=>{
        if (data.status) {
          alert("Produit supprimé avec succes")
          this.recevoir_entree(this.item.date)
        } else {
          alert("Echec de suppression")
        }
        console.log("status",data)
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
