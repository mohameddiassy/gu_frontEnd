import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashbordComponent } from 'src/app/basDroite/dashbord/dashbord.component';
import { DetailProduitComponent } from 'src/app/basDroite/detail-produit/detail-produit.component';
import { EntreeComponent } from 'src/app/basDroite/entree/entree.component';
import { FournisseurComponent } from 'src/app/basDroite/fournisseur/fournisseur.component';
import { SortieComponent } from 'src/app/basDroite/sortie/sortie.component';
import { ListeDashbordComponent } from 'src/app/basGauche/liste-dashbord/liste-dashbord.component';
import { ListeEntreeComponent } from 'src/app/basGauche/liste-entree/liste-entree.component';
import { ListeFournisseurComponent } from 'src/app/basGauche/liste-fournisseur/liste-fournisseur.component';
import { ListeProduitEntrantComponent } from 'src/app/basGauche/liste-produit-entrant/liste-produit-entrant.component';
import { ListejoursComponent } from 'src/app/basGauche/listejours/listejours.component';
import { ListeproduitsComponent } from 'src/app/basGauche/listeproduits/listeproduits.component';
import { ApiService } from 'src/app/service/api.service';
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
  fenetres:any={
    "fenetre_sortie":
    {
      nom:"Sortie",
      basGauche:ListejoursComponent,
      basDroite:SortieComponent
    },
    "fenetre_entree":
    {
      nom:"Entrée",
      basGauche:ListeEntreeComponent,
      basDroite:EntreeComponent
    },
    "fenetre_produit_entrant":{
      nom:"Produits Entrants",
      basGauche:ListeProduitEntrantComponent,
      basDroite:DetailProduitComponent
    },
    "fenetre_produit_sortant":{
      nom:"Produits Sortants",
      basGauche:ListeproduitsComponent,
      basDroite:DetailProduitComponent
    },
    "fenetre_dashbord":{
      nom:"Tableau de Bord",
      basGauche:ListeDashbordComponent,
      basDroite:DashbordComponent
    },
    "fenetre_fournisseur":{
      nom:"Fournisseur",
      basGauche:ListeFournisseurComponent,
      basDroite:FournisseurComponent
    }
  }
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
