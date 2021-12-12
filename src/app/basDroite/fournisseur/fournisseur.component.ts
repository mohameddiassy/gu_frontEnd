import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AjoutChequeComponent } from 'src/app/modal/ajout-cheque/ajout-cheque.component';
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
  recherche=""
  ajouterchequecomponent=AjoutChequeComponent
  ajouterfournisseurcomponent=AjouterFournisseurComponent
  constructor(public api:ApiService,private http:HttpClient) { 
    // this.produit=this.api.global.les_produits[0]
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="item_liste_fournisseur"){
        this.fournisseur=data.data
        this.recevoir_details()
      }else if(data.code=="apres_ajouter_cheque"){
        this.les_details.cheques.push(data.data)
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
    return "---"
  }
  get_sum_attente(){
    return 0
  }
  ajouter_cheque(){
    this.api.closeAllBool()
    this.api.bool.ajoutercheque=!this.api.bool.ajoutercheque
    this.api.sendEvent("ajouter_cheque",this.fournisseur);
  }
}
