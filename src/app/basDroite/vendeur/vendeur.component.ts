import { AjouterVendeurComponent } from 'src/app/modal/ajouter-vendeur/ajouter-vendeur.component';
import { ApiService } from 'src/app/service/api.service';
import {multi} from './data';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjouterSortieComponent } from '../../modal/ajouter-sortie/ajouter-sortie.component';
import * as XLSX from 'xlsx';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-vendeur',
  templateUrl: './vendeur.component.html',
  styleUrls: ['./vendeur.component.css']
})
export class VendeurComponent implements OnInit {
  vendeur:any
  ajoutervendeurcomponent=AjouterVendeurComponent
  les_sorties = [];
  fileName= 'rapport_journalier.xlsx';
  item:any={};
  mois_select: any;
  ajoutersortiecomponent=AjouterSortieComponent
  clicksuscription: Subscription = new Subscription;
  recherche=""
  closeResult = '';
 les_stats:any
 les_mois:any[]=[]
  les_statistiques:any=[
    {nom:"Nombre de Sorties",chiffre:0,bg:"ffffff"},
    {nom:"Montant total vendu",chiffre:0,bg:"ffffff"},
    {nom:"Montant total encaissé",chiffre:0,bg:"ffffff"},
    {nom:"Montant total Reliquat",chiffre:0,bg:"ffffff"},
    {nom:"Total commission",chiffre:0,bg:"ffffff"},
  ]
  id_produit_supprime: any;
  
  constructor(public api:ApiService,private modalService: NgbModal) { 
    // this.produit=this.api.global.les_produits[0]
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="item_liste_vendeur"){
        this.vendeur=data.data
        
        this.recevoir_mois();
      }
    })
    Object.assign(this, { multi });
  }

  recevoir_mois(){
    this.api.post_utilisateur_connecte({les_mois:true}).subscribe((data:any)=>{
      this.les_mois=data.les_mois
      this.mois_select = this.les_mois[0].mois;
      this.recevoir_sorties();
      //this.les_stats=data.les_statistiques
      console.log("get_sortie_date",data)
      this.get_stats() ;
    })
  }

  changement_mois(){
    //this.recevoir_sorties()
    this.recevoir_sorties();
  }


  ajoutersortie(){
    this.api.bool.ajoutersortie=!this.api.bool.ajoutersortie
    this.api.sendEvent("ajoutersortie",this.item);
  }
  modifier_sortie(sortie:any,date:any){
    this.api.closeAllBool()
    this.api.bool.ajoutersortie=!this.api.bool.ajoutersortie
    this.api.sendEvent("modifiersortie",[this.item,sortie]);

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

  recevoir_sorties(){
    this.api.post_utilisateur_connecte({get_sortie_by_vendeur:true,id_vendeur:this.vendeur.id_vendeur, date:this.mois_select}).subscribe((data:any)=>{
      this.les_sorties=data.les_sorties_vendeur
      this.les_stats=data.les_statistiques
      console.log("get_sortie_date",data)
      console.log("mois : ",this.mois_select);
      this.get_stats() ;
    })
  }
  get_stats() {
    this.les_statistiques[1].chiffre=0
    this.les_statistiques[2].chiffre=0
    this.les_statistiques[3].chiffre=0
    this.les_statistiques[4].chiffre=0
    this.les_statistiques[0].chiffre=this.les_sorties.length
    this.les_sorties.forEach((element:any)=>{
      this.les_statistiques[1].chiffre= this.api.parse(this.les_statistiques[1].chiffre)+(this.api.parse(element.quantite)-this.api.parse(element.restant)-this.api.parse(element.ration))*this.api.parse(element.prix_unitaire)
      this.les_statistiques[2].chiffre= this.api.parse(this.les_statistiques[2].chiffre)+this.api.parse(element.verse)
      this.les_statistiques[3].chiffre= this.api.parse(this.les_statistiques[3].chiffre)+(this.api.parse(element.quantite)-this.api.parse(element.restant)-this.api.parse(element.ration))*this.api.parse(element.prix_unitaire)-this.api.parse(element.verse)    
      this.les_statistiques[4].chiffre= this.api.parse(this.les_statistiques[4].chiffre)+(this.api.parse(element.quantite)-this.api.parse(element.restant)-this.api.parse(element.ration))*this.api.parse(element.commission)    
    })
    this.les_statistiques[1].chiffre+=" FCFA"
    this.les_statistiques[2].chiffre+=" FCFA"
    this.les_statistiques[3].chiffre+=" FCFA"
    this.les_statistiques[4].chiffre+=" FCFA"
    var i=3
    var j=0
    // this.les_stats.forEach((element2:any) => {
    //   this.les_statistiques[i+1]={nom:element2.nom_vendeur,quantite:element2.quantite,bg:"#ffffff",chiffre:element2.total_verse+"F CFA",chiffre2:"/"+element2.montant_total+" F CFA "}
    //  i=i+1
    //  j=j+1
    // })
    console.log("waxellll",this.les_stats)

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
    this.api.post_utilisateur_connecte({delete_sortie:true,id_sortie:id_sortie}).subscribe((data:any)=>{


      console.log("status",data)
    })
  }

  verser(verse:any)
  {
    console.log("sendddd",verse)

    this.api.post_utilisateur_connecte({add_versement: true,versement:JSON.stringify(verse) }).subscribe((data:any)=>{
      console.log("retour",data)
    })
  }
  retour(retour:any)
  {
    console.log("sendddd",retour)

    this.api.post_utilisateur_connecte({update_retour:true,sortie:JSON.stringify(retour) }).subscribe((data:any)=>{
      console.log("retour",data)
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

  //########################################################
  ngOnInit(): void {
  }
  ajouter_vendeur(){
    this.api.closeAllBool()
    this.api.bool.ajoutervendeur=!this.api.bool.ajoutervendeur
    this.api.sendEvent("ajouter_vendeur",this.vendeur);
  }
  
  modifier_vendeur(){
    this.api.closeAllBool()
    this.api.bool.ajoutervendeur=!this.api.bool.ajoutervendeur
    this.api.sendEvent("modifier_vendeur",this.vendeur);
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  
}
