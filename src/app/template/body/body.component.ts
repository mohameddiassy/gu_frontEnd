import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsommationComponent } from 'src/app/basDroite/consommation/consommation.component';
import { DashbordLteComponent } from 'src/app/basDroite/dashbord-lte/dashbord-lte.component';
import { DashbordComponent } from 'src/app/basDroite/dashbord/dashbord.component';
import { DetailProduitComponent } from 'src/app/basDroite/detail-produit/detail-produit.component';
import { EntreeComponent } from 'src/app/basDroite/entree/entree.component';
import { FournisseurComponent } from 'src/app/basDroite/fournisseur/fournisseur.component';
import { ParametreComponent } from 'src/app/basDroite/parametre/parametre.component';
import { ProductionComponent } from 'src/app/basDroite/production/production.component';
import { SortieComponent } from 'src/app/basDroite/sortie/sortie.component';
import { VendeurComponent } from 'src/app/basDroite/vendeur/vendeur.component';
import { ListeConsommationComponent } from 'src/app/basGauche/liste-consommation/liste-consommation.component';
import { ListeDashbordComponent } from 'src/app/basGauche/liste-dashbord/liste-dashbord.component';
import { ListeEntreeComponent } from 'src/app/basGauche/liste-entree/liste-entree.component';
import { ListeFournisseurComponent } from 'src/app/basGauche/liste-fournisseur/liste-fournisseur.component';
import { ListeParametreComponent } from 'src/app/basGauche/liste-parametre/liste-parametre.component';
import { ListeProductionComponent } from 'src/app/basGauche/liste-production/liste-production.component';
import { ListeProduitEntrantComponent } from 'src/app/basGauche/liste-produit-entrant/liste-produit-entrant.component';
import { ListeVendeurComponent } from 'src/app/basGauche/liste-vendeur/liste-vendeur.component';
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
    },
    "fenetre_vendeur":{
      nom:"Vendeur",
      basGauche:ListeVendeurComponent,
      basDroite:VendeurComponent
    },
    "fenetre_production":{
      nom:"Production",
      basGauche:ListeProductionComponent,
      basDroite:ProductionComponent
    },
    "fenetre_consommation":{
      nom:"Consommation",
      basGauche:ListeConsommationComponent,
      basDroite:ConsommationComponent
    },
    "fenetre_parametre":{
      nom:"Paramètre",
      basGauche:ListeParametreComponent,
      basDroite:ParametreComponent
    }
  }

  constructor(public api:ApiService,public route:Router,private router:ActivatedRoute) {
    router.params.subscribe((params:any)=>{
      let e=params["id_entreprise"]
      let f=params["fenetre"]
      if (f && e) {
        console.log("id_entreprise=",f)
        if(api.global.fenetre_selectionnee!=f){
          api.global.fenetre_selectionnee=f
        }
        
      } else {
        console.log("pas de parametre fenentre ",f,params)
      }
    })
   }

  ngOnInit(): void {
    // this.api.toggleSidenav()
    this.verifier_session()
  }
  verifier_session(){
    let u:any = localStorage.getItem('utilisateur');
    let user=JSON.parse(u)
    console.log("session= ",u)
    if (user==null) {//non connecté
      this.route.navigate(["/connexion"])
    } else {
      this.api.global.utilisateur_connecte=user
    }
  }
}
