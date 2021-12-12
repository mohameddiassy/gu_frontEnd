import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AjouterVendeurComponent } from 'src/app/modal/ajouter-vendeur/ajouter-vendeur.component';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-vendeur',
  templateUrl: './liste-vendeur.component.html',
  styleUrls: ['./liste-vendeur.component.css']
})
export class ListeVendeurComponent implements OnInit {

  vendeur:any
  ajoutervendeurcomponent=AjouterVendeurComponent

  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.recevoir_vendeur()

  }
  clique(item:any){
    this.api.sendEvent("item_liste_vendeur",item)
    this.api.closeSidenav()
  }
  recevoir_vendeur(){
    this.api.post_utilisateur_connecte({get_vendeur:true}).subscribe((data:any)=>{
      if (data.status) {
        this.api.global.les_vendeurs=data.les_vendeurs
        this.api.sendEvent("item_liste_vendeur",this.api.global.les_vendeurs[0])
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }

  ajouter_vendeur(){
    this.api.closeAllBool()
    this.api.bool.ajoutervendeur=!this.api.bool.ajoutervendeur
    this.api.sendEvent("ajouter_vendeur",this.vendeur);
  }
}