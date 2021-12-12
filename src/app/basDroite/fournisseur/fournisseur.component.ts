import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AjoutChequeComponent } from 'src/app/modal/ajout-cheque/ajout-cheque.component';
import { AjoutDetteComponent } from 'src/app/modal/ajout-dette/ajout-dette.component';
import { AjouterFournisseurComponent } from 'src/app/modal/ajouter-fournisseur/ajouter-fournisseur.component';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
  fournisseur:any={}
  les_details:any={
    entree:[],
    attente:[],
    dettes:[],
    cheques:[],
  }
  page=1
  pageSize=4
  page_entree=1
  pageSize_entree=4
  page_cheque=1
  pageSize_cheque=2
  page_dette=1
  pageSize_dette=2
  p=1
  ps=2
  recherche=""
  ajouterchequecomponent=AjoutChequeComponent
  ajouterdettecomponent=AjoutDetteComponent
  ajouterfournisseurcomponent=AjouterFournisseurComponent
  constructor(public api:ApiService,private http:HttpClient) { 
    // this.produit=this.api.global.les_produits[0]
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="item_liste_fournisseur"){
        this.fournisseur=data.data
        this.recevoir_details()
      }else if(data.code=="apres_ajouter_cheque"){
        this.les_details.cheques.push(data.data)
      }else if(data.code=="apres_ajouter_dette"){
        this.les_details.dettes.push(data.data)
      }
    })
  }
  ngOnInit(): void {
    
  }
  ajouter_fournisseur(){
    this.api.closeAllBool()
    this.api.bool.ajouterfournisseur=!this.api.bool.ajouterfournisseur
    this.api.sendEvent("ajouter_fournisseur",this.fournisseur);
  }
  
  modifier_fournisseur(){
    this.api.closeAllBool()
    this.api.bool.ajouterfournisseur=!this.api.bool.ajouterfournisseur
    this.api.sendEvent("modifier_fournisseur",this.fournisseur);
  }
  supprimer_fournisseur(){
    this.api.post_utilisateur_connecte({delete_fournisseur:true,id_fournisseur:this.fournisseur.id_fournisseur}).subscribe((data:any)=>{
      console.log("Supression de Fournisseur: ",data)
      if(data.status){
        alert("Fournisseur désactivé avec succés")
        this.fournisseur.etat=-1
      }else{
        alert("Echec de supression")
      }
    })
  }
  recevoir_details(){
    this.api.post_utilisateur_connecte({details_fournisseur:true,id_fournisseur:this.fournisseur.id_fournisseur}).subscribe((data:any)=>{
      console.log("Details Fournisseur: ",data)
      if(data.status){
        this.les_details=data
      }else{
        console.log("Echec ")
      }
    })
  }
  get_sum_entree(){
    var somme=0
    this.les_details?.entree.forEach((element:any) => {
      somme+=(element.quantite*element.prix_unitaire)
    });
    return somme
  }
  get_dette(){
    var somme=0
    var date=""
    this.les_details?.dettes.forEach((element:any) => {
      if(element.status==0){
        somme+=parseFloat(element.montant)
        date=element.date_echeance
      }
      
    });
    return somme
  }
  get_sum_attente(){
    return 0
  }
  ajouter_cheque(){
    this.api.closeAllBool()
    this.api.bool.ajoutercheque=!this.api.bool.ajoutercheque
    this.api.sendEvent("ajouter_cheque",this.fournisseur);
  }
  ajouter_dette(){
    this.api.closeAllBool()
    this.api.bool.ajouterdette=!this.api.bool.ajouterdette
    this.api.sendEvent("ajouter_dette",this.fournisseur);
  }
  modifier_cheque(cheque:any){
    this.api.closeAllBool()
    this.api.bool.ajoutercheque=!this.api.bool.ajoutercheque
    this.api.sendEvent("modifier_cheque",{fournisseur:this.fournisseur,cheque:cheque});
  }
  delete_cheque(cheque:any){
    /*
    cheque:any={
      id_cheque:'int(255) (primary key, obligatoire)'
    }
    */
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in cheque) {
      formdata.append(key,cheque[key])
    }

    let api_url="http://localhost/gestionuniversel_back/amar_api/cheque/delete" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        alert("Opération effectuée avec succés sur la table cheque")
        console.log("Opération effectuée avec succés sur la table cheque. Réponse= ",reponse)
        this.les_details.cheques.splice(this.les_details.cheques.indexOf(cheque),1)
      }else{
        console.log("L'opération sur la table cheque a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
    })
  }
  modifier_dette(dette:any){
    this.api.closeAllBool()
    this.api.bool.ajouterdette=!this.api.bool.ajouterdette
    this.api.sendEvent("modifier_dette",{fournisseur:this.fournisseur,dette:dette});
  }
  delete_dette(dette:any){
    /*
    cheque:any={
      id_cheque:'int(255) (primary key, obligatoire)'
    }
    */
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in dette) {
      formdata.append(key,dette[key])
    }

    let api_url="http://localhost/gestionuniversel_back/amar_api/dette/delete" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        alert("Opération effectuée avec succés sur la table dette")
        console.log("Opération effectuée avec succés sur la table dette. Réponse= ",reponse)
        this.les_details.dettes.splice(this.les_details.dettes.indexOf(dette),1)
      }else{
        console.log("L'opération sur la table dette a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
    })
  }
  get_cheque_non_rembourse(){
    var somme=0
    this.les_details?.cheques.forEach((element:any) => {
      if(element.status==0){
        somme+=parseFloat(element.montant)
      }
    });
    return somme
  }
}
