import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjouterSortieComponent } from '../../modal/ajouter-sortie/ajouter-sortie.component';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/service/api.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent implements OnInit {
  les_sorties:any=[]
  fileName= 'rapport_journalier.xlsx';
  item:any={}
  lecomponent=SortieComponent
  ajoutersortiecomponent=AjouterSortieComponent
  clicksuscription: Subscription = new Subscription;
  recherche=""
  closeResult = '';

  les_statistiques:any=[
    {nom:"Nombre de Sorties",chiffre:0,bg:"primary"},
    {nom:"Montant total vendu",chiffre:0,bg:"secondary"},
    {nom:"Montant total encaissé",chiffre:0,bg:"success"},
    {nom:"Montant total Reliquat",chiffre:0,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:0,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:0,bg:"primary"},
    {nom:"Nombre de Sorties",chiffre:0,bg:"primary"},
  ]
  id_produit_supprime: any;
  constructor(public api:ApiService,private modalService: NgbModal) {
    api.getEvent().subscribe((data)=>{
      if(data.code=="sortie_par_jours_par_enregistreur"){
        this.item=data.data
        this.recevoir_sorties(data.data.date)
      }
    })
  }
  ngOnInit(): void {
  }

  ajoutersortie(){
    this.api.bool.ajoutersortie=!this.api.bool.ajoutersortie
    this.api.sendEvent("ajoutersortie",this.item);
  }
  modifier_sortie(sortie:any){
    this.api.closeAllBool()
    this.api.bool.ajoutersortie=!this.api.bool.ajoutersortie
    this.api.sendEvent("modifiersortie",sortie);
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

  recevoir_sorties(date:string){
    this.api.post_utilisateur_connecte({get_sortie_date:true,date:date}).subscribe((data:any)=>{
      this.les_sorties=data.les_produits
      console.log("get_sortie_date",data)
      this.get_stats() ;
    })
  }
  get_stats() {
    this.les_statistiques[0].chiffre=this.les_sorties.length
    this.les_sorties.forEach((element:any)=>{
      this.les_statistiques[1].chiffre+=(this.api.parse(element.quantite)-this.api.parse(element.restant)-this.api.parse(element.ration))*this.api.parse(element.prix_unitaire)
      this.les_statistiques[2].chiffre+=this.api.parse(element.verse)
      this.les_statistiques[3].chiffre+=(this.api.parse(element.quantite)-this.api.parse(element.restant)-this.api.parse(element.ration))*this.api.parse(element.prix_unitaire)-this.api.parse(element.verse)
    })

  }







  open(content:any,sortie:any) {
    this.id_produit_supprime=sortie

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  suppression(id_sortie:number)
  {
    console.log("donnee send",id_sortie);
    this.api.post_utilisateur_connecte({delete_sortie:true,id_consommation:id_sortie}).subscribe((data:any)=>{


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


