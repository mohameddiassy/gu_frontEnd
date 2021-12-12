import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';
import { ListejoursComponent } from '../listejours/listejours.component';

@Component({
  selector: 'app-liste-fournisseur',
  templateUrl: './liste-fournisseur.component.html',
  styleUrls: ['./liste-fournisseur.component.css']
})
export class ListeFournisseurComponent implements OnInit {
  fournisseur:any
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.recevoir_fournisseur()

  }
  clique(item:any){
    this.fournisseur=item
    this.api.sendEvent("item_liste_fournisseur",item)
    this.api.closeSidenav()
  }
  recevoir_fournisseur(){
    this.api.post_utilisateur_connecte({get_fournisseur:true}).subscribe((data:any)=>{
      if (data.status) {
        this.api.global.les_fournisseurs=data.les_fournisseurs
        if(this.api.global.les_fournisseurs.length>0){
          this.fournisseur=this.api.global.les_fournisseurs[1]
            this.api.sendEvent("item_liste_fournisseur",this.fournisseur)
        }
      } else {
        console.log("erreur de reception des fournisseurs")
      }
    })
  }
  ajouter_fournisseur(){
    this.api.closeAllBool()
    this.api.bool.ajouterfournisseur=!this.api.bool.ajouterfournisseur
    this.api.sendEvent("ajouter_fournisseur",{});
  }
  refresh(fournisseur:any){
    this.api.post_utilisateur_connecte({refresh_fournisseur:true,id_fournisseur:fournisseur.id_fournisseur}).subscribe((data:any)=>{
      console.log("Supression de produit: ",data)
      if(data.status){
        alert("fournisseur réstauré avec succés")
        fournisseur.etat=0;
      }else{
        alert("Echec de restauration")
      }
    })
  }
}

