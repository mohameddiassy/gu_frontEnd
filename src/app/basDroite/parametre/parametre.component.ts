import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/service/api.service';
import { AjoutUtilisateurComponent } from 'src/app/modal/ajout-utilisateur/ajout-utilisateur.component';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {

  les_utilisateurs:any=[]
  fileName= 'rapport_journalier.xlsx';
  item:any={}
  ajouterutilisateurcomponent=AjoutUtilisateurComponent
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
  utilisateur_courant:any
  constructor(public api:ApiService) {
    api.getEvent().subscribe((data)=>{
      if(data.code=="liste_parametre_utilisateur"){
        this.item=data.data
        this.recevoir_les_utilisateurs()
      }
    })
  }

  ngOnInit(): void {
  }

  ajouterutilisateur(){
    this.api.bool.ajouterutilisateur=!this.api.bool.ajouterutilisateur
    this.api.sendEvent("ajouterutilisateur",this.item);
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
  
  recevoir_les_utilisateurs(){
    this.api.post_utilisateur_connecte({get_utilisateur_entreprise:true}).subscribe((data:any)=>{
      this.les_utilisateurs=data.les_utilisateurs
      console.log("get_utilisateur_entreprise",data)
      if(this.les_utilisateurs.length!=0){
        this.utilisateur_courant=this.les_utilisateurs[0]
      }
    })
  }
  clique_utiliateur(un_utilisateur:any){
    this.utilisateur_courant=un_utilisateur
  }
}

