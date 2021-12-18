import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AjouterProduitComponent } from 'src/app/modal/ajouter-produit/ajouter-produit.component';
import { ApiService } from 'src/app/service/api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-produit-sortant',
  templateUrl: './produit-sortant.component.html',
  styleUrls: ['./produit-sortant.component.css']
})
export class ProduitSortantComponent implements OnInit {
  pageSize_production=2
  produit:any
  ajouterproduitcomponent=AjouterProduitComponent
  les_details: any;
  les_statistiques:any=[]
  jour:any
  produit_supprime:any
  closeResult = '';
  http: any;
  constructor(public api:ApiService,private modalService: NgbModal) { 
    // this.produit=this.api.global.les_produits[0]
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="item_liste_produit_sortant"){
        this.produit=Object.assign({},data.data)
      }else if(data.code=="apres_ajout_consommation"){
        this.recevoir_details(this.jour["date"])
      }else if(data.code=="apres_modification_consommation"){
        this.recevoir_details(this.jour["date"])
      }else if(data.code=="apres_ajout_production"){
        this.recevoir_details(this.jour["date"])
      }else if(data.code=="apres_modification_production"){
        this.recevoir_details(this.jour["date"])
      }else if(data.code=="apres_ajout_depense"){
        this.recevoir_details(this.jour["date"])
      }else if(data.code=="apres_modification_depense"){
        this.recevoir_details(this.jour["date"])
      }
    })
  }
  ngOnInit(): void {
    this.recevoir_production_par_jours_par_enregistreur()
  }
  
  ajouter_produit(){
    this.api.closeAllBool()
    this.api.bool.ajouterproduit=!this.api.bool.ajouterproduit
    this.api.sendEvent("ajouter_produit",this.produit);
  }

  open(content:any,entree:any) {
    this.produit_supprime=entree

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  
  modifier_produit(){
    this.api.closeAllBool()
    this.api.bool.ajouterproduit=!this.api.bool.ajouterproduit
    var p=Object.assign({},this.produit)
    this.api.sendEvent("modifier_produit",p);
  }
  supression_produit(){
    this.api.post_utilisateur_connecte({delete_produit:true,id_produit:this.produit.id_produit}).subscribe((data:any)=>{
      console.log("Supression de produit: ",data)
      if(data.status){
        alert("Produit désactivé avec succés")
        this.produit.etat=-1
      }else{
        alert("Echec de supression")
      }
    })
  }
  recevoir_details(date:string){
    this.api.post_utilisateur_connecte({details_produits_sortant:true,date:date,id_produit:this.produit.id_produit}).subscribe((data:any)=>{
      this.les_details=data
      console.log("details_produits_sortant: ",data)
    })
  }
  recevoir_production_par_jours_par_enregistreur(){
    this.api.post_utilisateur_connecte({get_production_par_jours_par_enregistreur:true}).subscribe((data:any)=>{
      console.log(data)
      if (data.status) {
        this.api.global.production_par_jours_par_enregistreur=data.production_par_jours_par_enregistreur
        if (this.api.global.production_par_jours_par_enregistreur.length>0 && this.api.global.production_par_jours_par_enregistreur[0].date==moment().format("YYYY-MM-DD")) {
          // on a deja un enregistrement pour aujourd'hui
        } else {
          console.log("pas d'enregistrement ")
          this.api.global.production_par_jours_par_enregistreur.unshift({
              "date": moment().format("YYYY-MM-DD"),
              "nombre": "0",
              "montant": "0"
          })
        }
        this.jour=this.api.get_selected_item_by_date(this.api.global.production_par_jours_par_enregistreur,"date",this.api.global.selected_item.bas_droite_selected_item)
        this.jour?this.recevoir_details(this.jour["date"]):alert("date inexistante")
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
  get_sum_consommation(){
    var somme=0
    this.les_details?.consommation.forEach((element:any) => {
      somme+=(element.quantite*element.prix_unitaire)
    });
    return somme
  }
  get_sum_production(){
    var somme=0
    this.les_details?.production.forEach((element:any) => {
      somme+=(element.quantite*element.prix_unitaire)
    });
    return somme
  }
  get_sum_depense(){
    var somme=0
    this.les_details?.depense.forEach((element:any) => {
      somme+=parseFloat(element.montant)
    });
    return somme
  }
  get_quantite_totale_production(){
    var somme=0
    this.les_details?.production.forEach((element:any) => {
      somme+=parseFloat( element.quantite)
    });
    return somme
  }
  get_prix_revient(){
    if(this.get_quantite_totale_production()==0){
      return 0
    }
    return this.get_sum_consommation()/this.get_quantite_totale_production()
  }
  get_prix_revient_avec_depense(){
    if(this.get_quantite_totale_production()==0){
      return 0
    }
    return (this.get_sum_consommation()+this.get_sum_depense())/this.get_quantite_totale_production()
  }
  choisir_jour(item:any){
    this.jour=item
    this.recevoir_details(this.jour["date"])
    this.api.global.selected_item.bas_gauche_selected_item=this.produit.id_produit
    this.api.global.selected_item.bas_droite_selected_item=item.date
    this.api.redirect_to("fenetre_produit_sortant")
  }
  regulier(regulier:string){
    switch (regulier) {
      case '0':
        return "non régulier";
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
  
  ajouter_consommation(){
    this.api.closeAllBool()
    this.api.bool.ajouterconsommation=!this.api.bool.ajouterconsommation
    this.api.sendEvent("ajouterconsommation",{jour:this.jour,id_produit:this.produit.id_produit});
  }
  ajouter_depense(){
    this.api.closeAllBool()
    this.api.bool.ajouterdepense=!this.api.bool.ajouterdepense
    this.api.sendEvent("ajouter_depense",this.jour);
  }
  ajouter_production(){
    this.api.closeAllBool()
    this.api.bool.ajouterproduction=!this.api.bool.ajouterproduction
    this.api.sendEvent("ajouterproduction",{jour:this.jour,id_produit:this.produit.id_produit});
  }

  modifier_production(production:any){
    this.api.closeAllBool()
    this.api.bool.ajouterproduction=!this.api.bool.ajouterproduction
    this.api.sendEvent("modifierproduction",[this.jour,production]);
  }
  modifier_consommation(consommation:any){
    this.api.closeAllBool()
    this.api.bool.ajouterconsommation=!this.api.bool.ajouterconsommation
    this.api.sendEvent("modifierconsommation",[this.jour,  consommation]);
  }
  supprimer_consommation(produit:any)
  {
    console.log("donnee send",produit);
    this.api.post_utilisateur_connecte({delete_consommation:true,id_consommation:produit.id_consommation}).subscribe((data:any)=>{
      if (data.status) {
        alert("Produit supprimé avec succes")
        this.les_details.consommation.splice(this.les_details.consommation.indexOf(produit),1)  
      } else {
        alert("Echec de suppression")
      }
      console.log("status",data)
    })
  }
  modifier_depense(depense:any){
    this.api.closeAllBool()
    this.api.bool.ajouterdepense=!this.api.bool.ajouterdepense
    this.api.sendEvent("modifier_depense",{jour:this.jour,depense:depense});
  }
  
  delete_depense(depense:any){
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in depense) {
      formdata.append(key,depense[key])
    }

    let api_url="http://localhost/gestionuniversel_back/amar_api/depense/delete" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        alert("Opération effectuée avec succés sur la table depense.")
        this.les_details.depenses.splice(this.les_details.depenses.indexOf(depense),1)
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
  supprimer_production(production:any)
  {
    this.api.post_utilisateur_connecte({delete_production:true,id_production:production.id_production}).subscribe((data:any)=>{

      if(data.status){
        alert("Suppression reussie !")
        this.les_details.production.splice(this.les_details.production.indexOf(production),1)
      }else{
        alert("Echec de la suppression")
      }
    })
  }
  get_benefice_unitaire(){
    if(this.get_sum_production()==0){
      return 0
    }
    return this.produit?.prix_unitaire-this.get_prix_revient()
  }
  get_benefice_total(){
    if(this.get_sum_production()==0){
      return 0
    }
    return this.get_sum_production()-this.get_sum_consommation()
  }
  get_benefice_total_avec_depense(){
    if(this.get_sum_production()==0){
      return 0
    }
    return this.get_sum_production()-this.get_sum_consommation() -this.get_sum_depense()
  }
  get_benefice_unitaire_avec_depense(){
    if(this.get_sum_production()==0){
      return 0
    }
    return this.produit?.prix_unitaire-this.get_prix_revient_avec_depense()
  }
}

