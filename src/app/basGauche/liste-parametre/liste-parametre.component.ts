import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-parametre',
  templateUrl: './liste-parametre.component.html',
  styleUrls: ['./liste-parametre.component.css']
})
export class ListeParametreComponent implements OnInit {
  options_parametre:any[]=[
    {nom:"Gestion des utilisateurs"},
    {nom:"Parametrer les pages"},
    {nom:"Parametrer les produits"},
    {nom:"Profil"},
    {nom:"Charge du personnel"},  
  ]
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.api.sendEvent("liste_parametre_utilisateur",this.options_parametre[0])
  }
  clique(item:any){
    this.api.sendEvent("liste_parametre_utilisateur",item)
    this.api.closeSidenav()
  }
}

