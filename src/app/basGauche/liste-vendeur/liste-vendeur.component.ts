import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-vendeur',
  templateUrl: './liste-vendeur.component.html',
  styleUrls: ['./liste-vendeur.component.css']
})
export class ListeVendeurComponent implements OnInit {

  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.recevoir_vendeur()

  }
  clique(item:any){
    this.api.sendEvent("item_liste_vendeur",item)
    this.api.closeSidenav()
  }
  recevoir_vendeur(){
    this.api.post({get_vendeur:true,id_enregistreur:this.api.global.utilisateur_connecte.id_utilisateur}).subscribe((data:any)=>{
      if (data.status) {
        this.api.global.les_vendeurs=data.les_vendeurs
        this.api.sendEvent("item_liste_vendeur",this.api.global.les_vendeurs[0])
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
}