import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/service/api.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-consommation',
  templateUrl: './consommation.component.html',
  styleUrls: ['./consommation.component.css']
})
export class ConsommationComponent implements OnInit {
  pageSize=5
  page=1
  pageSize_depenses=5
  page_depenses=1
  les_consommations:any=[]
  les_depenses:any=[]
  fileName= 'rapport_journalier.xlsx';
  item:any={}
  closeResult = '';
  produit_supprime:any
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
  constructor(public api:ApiService,private modalService: NgbModal,private http:HttpClient) {
    api.getEvent().subscribe((data)=>{
      if(data.code=="item_liste_consommation"){
        this.item=data.data
        this.recevoir_consommations(data.data.date)
      }else if(data.code=="apres_ajout_consommation"){
        this.recevoir_consommations(data.data.date)
      }else if(data.code=="apres_modification_consommation"){
        this.recevoir_consommations(data.data.date)
      }else if(data.code=="apres_ajout_depense"){
        this.recevoir_consommations(data.data.date)
      }else if(data.code=="apres_modification_depense"){
        this.recevoir_consommations(data.data.date)
      }
    })
  }

  ngOnInit(): void {
    
  }

  ajouter(){
    this.api.closeAllBool()
    this.api.bool.ajouterconsommation=!this.api.bool.ajouterconsommation
    this.api.sendEvent("ajouterconsommation",{jour:this.item,id_produit:0});
  }
  ajouter_depense(){
    this.api.closeAllBool()
    this.api.bool.ajouterdepense=!this.api.bool.ajouterdepense
    this.api.sendEvent("ajouter_depense",this.item);
  }
  modifier_consommation(consommation:any){
    this.api.closeAllBool()
    this.api.bool.ajouterconsommation=!this.api.bool.ajouterconsommation
    this.api.sendEvent("modifierconsommation",[this.item,  consommation]);
  }
  modifier_depense(depense:any){
    this.api.closeAllBool()
    this.api.bool.ajouterdepense=!this.api.bool.ajouterdepense
    this.api.sendEvent("modifier_depense",{jour:this.item,depense:depense});
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
    this.api.post_utilisateur_connecte({get_consommation_date:true,date:date}).subscribe((data:any)=>{
      this.les_consommations=data.les_consommations
      this.les_depenses=data.les_depenses
      console.log("get_consommation_date",data)
    })
  }
  open(content:any,sortie:any) {
    this.produit_supprime=sortie

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  suppression(produit:any)
  {
    console.log("donnee send",produit);
    this.api.post_utilisateur_connecte({delete_consommation:true,id_consommation:produit.id_consommation}).subscribe((data:any)=>{
      if (data.status) {
        alert("Produit supprimé avec succes")
        this.recevoir_consommations(this.item.date)  
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
  delete_depense(depense:any){
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in depense) {
      formdata.append(key,depense[key])
    }

    let api_url=this.api.host+"amar_api/depense/delete" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        alert("Opération effectuée avec succés sur la table depense.")
        this.les_depenses.splice(this.les_depenses.indexOf(depense),1)
        console.log("Opération effectuée avec succés sur la table depense. Réponse= ",reponse)
      }else{
        alert("L'opération sur la table depense a échoué")
        console.log("L'opération sur la table depense a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
    })
  }
  regulier(regulier:string){
    switch (regulier) {
      case '0':
        return "non";
      case '1':
          return "chaque jour";
      case '2':
          return "chaque semaine";
      case '3':
          return "chaque mois";
      default:
        return "rien";
    }
  }
}

