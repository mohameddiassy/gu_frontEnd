import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-parametre',
  templateUrl: './liste-parametre.component.html',
  styleUrls: ['./liste-parametre.component.css']
})
export class ListeParametreComponent implements OnInit {
  options_parametre=[
    {nom:"Gestion des utilisateurs"},
    {nom:"Profil"},
    {nom:"Charge du personnel"},
    
  ]
  constructor(public api:ApiService) { }

  ngOnInit(): void {
  }
  clique(item:any){
    this.api.sendEvent("item_liste_parametre",item)
    this.api.closeSidenav()
  }
}

