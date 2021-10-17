import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsComponent } from 'src/app/basDroite/analytics/analytics.component';
import { ProduitComponent } from 'src/app/basDroite/produit/produit.component';
import { SortieMoisComponent } from 'src/app/basDroite/sortie-mois/sortie-mois.component';
import { SortieComponent } from 'src/app/basDroite/sortie/sortie.component';
import { ListeAnalyticsComponent } from 'src/app/basGauche/liste-analytics/liste-analytics.component';
import { ListejoursComponent } from 'src/app/basGauche/listejours/listejours.component';
import { ListemoisComponent } from 'src/app/basGauche/listemois/listemois.component';
import { ListeproduitsComponent } from 'src/app/basGauche/listeproduits/listeproduits.component';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { BasDroiteOptionnelComponent } from '../bas-droite-optionnel/bas-droite-optionnel.component';
import { BasDroiteComponent } from '../bas-droite/bas-droite.component';
import { BasGaucheComponent } from '../bas-gauche/bas-gauche.component';
import { HautDroiteOptionnelComponent } from '../haut-droite-optionnel/haut-droite-optionnel.component';
import { HautDroiteComponent } from '../haut-droite/haut-droite.component';
import { HautGaucheComponent } from '../haut-gauche/haut-gauche.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  les_components:any={
    hautgauche:HautGaucheComponent,
    hautdroite:HautDroiteComponent,
    basgauche:BasGaucheComponent,
    basdroite:BasDroiteComponent,
    hautdroiteoptionnel:HautDroiteOptionnelComponent,
    basdroiteoptionnel:BasDroiteOptionnelComponent
  }
  fenetres:any=[
    {
      nom:"Sortie Par jour",
      basGauche:ListejoursComponent,
      basDroite:SortieComponent
    },
    {
      nom:"Sortie par mois",
      basGauche:ListemoisComponent,
      basDroite:SortieMoisComponent
    },
    {
      nom:"Produits",
      basGauche:ListeproduitsComponent,
      basDroite:ProduitComponent
    },
    {
      nom:"Tableau de Bord",
      basGauche:ListeAnalyticsComponent,
      basDroite:AnalyticsComponent
    }
  ]
  constructor(public api:ApiService,public route:Router) { }

  ngOnInit(): void {
    this.api.toggleSidenav()
    this.verifier_session()
  }
  verifier_session(){
    let u:any = localStorage.getItem('utilisateur');
    let user=JSON.parse(u)
    // console.log("session= ",u)
    if (user==null) {//non connecté
      this.route.navigate(["/connexion"])
    } else {
      this.api.global.utilisateur_connecte=user
    }
  }
}
