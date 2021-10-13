import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './page/accueil/accueil.component';
import { AjoutUtilisateurComponent } from './admin/ajout-utilisateur/ajout-utilisateur.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './basDroite/produit/produit.component';
import { ConnexionComponent } from './page/connexion/connexion.component';
import { AjouterProduitComponent } from './ajouter-produit/ajouter-produit.component';
import { FormsModule } from '@angular/forms';
import { EntrepriseComponent } from './admin/entreprise/entreprise.component';
import { HttpClientModule } from '@angular/common/http';
import { ModifieProduitComponent } from './modifie-produit/modifie-produit.component';
import { DetailProduitComponent } from './basDroite/detail-produit/detail-produit.component';
import { DetailEntrepriseComponent } from './admin/detail-entreprise/detail-entreprise.component';
import { AjouterEntrepriseComponent } from './admin/ajouter-entreprise/ajouter-entreprise.component';
import { ModifierEntrepriseComponent } from './admin/modifier-entreprise/modifier-entreprise.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { AjouterUtilisateurComponent } from './admin/ajouter-utilisateur/ajouter-utilisateur.component';
import { ModifierUtilisateurComponent } from './admin/modifier-utilisateur/modifier-utilisateur.component';
import { DetailUtilisateurComponent } from './admin/detail-utilisateur/detail-utilisateur.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { SortieComponent } from './basDroite/sortie/sortie.component';
import { AjouterSortieComponent } from './ajouter-sortie/ajouter-sortie.component';
import { GerantComponent } from './admin/gerant/gerant.component';
import { AjouterGerantComponent } from './admin/ajouter-gerant/ajouter-gerant.component';
import { ModifierGerantComponent } from './admin/modifier-gerant/modifier-gerant.component';
import { DetailGerantComponent } from './admin/detail-gerant/detail-gerant.component';
import { AProposComponent } from './page/a-propos/a-propos.component';
import { HautGaucheComponent } from './template/haut-gauche/haut-gauche.component';
import { HautDroiteComponent } from './template/haut-droite/haut-droite.component';
import { BasGaucheComponent } from './template/bas-gauche/bas-gauche.component';
import { BasDroiteComponent } from './template/bas-droite/bas-droite.component';
import { BasDroiteOptionnelComponent } from './template/bas-droite-optionnel/bas-droite-optionnel.component';
import { HautDroiteOptionnelComponent } from './template/haut-droite-optionnel/haut-droite-optionnel.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListejoursComponent } from './basGauche/listejours/listejours.component';
import { ListemoisComponent } from './basGauche/listemois/listemois.component';
import { ListeproduitsComponent } from './basGauche/listeproduits/listeproduits.component';
import { EnteteJourComponent } from './entete/entete-jour/entete-jour.component';
import { EnteteMoisComponent } from './entete/entete-mois/entete-mois.component';
import { EnteteProduitComponent } from './entete/entete-produit/entete-produit.component';
import { SortieMoisComponent } from './basDroite/sortie-mois/sortie-mois.component';
import { AnalyticsComponent } from './basDroite/analytics/analytics.component';
import { EnteteAnalyticsComponent } from './entete/entete-analytics/entete-analytics.component';
import { ListeAnalyticsComponent } from './basGauche/liste-analytics/liste-analytics.component';
import { ChartModule } from 'angular2-chartjs';
import { Body2Component } from './template/body/body.component';

const routes: Routes = [
  { path: "", component: ConnexionComponent },
  { path: "accueil", component: Body2Component },
  { path: "accueil2", component: Body2Component },
  { path: "connexion", component: ConnexionComponent },
  { path: "admin", component: EntrepriseComponent },
  { path: "ajout_utilisateur", component: AjoutUtilisateurComponent },
  { path: "produit/:id_entreprise", component: ProduitComponent },
  { path: "detail-produit", component: DetailProduitComponent },
  { path: "ajouter-produit/:id_enregistreur", component: AjouterProduitComponent },
  { path: "modifier-produit", component: ModifieProduitComponent },
  { path: "modifier-produit/:id_produit", component: ModifieProduitComponent },
  { path: "entreprise", component: EntrepriseComponent },
  { path: "detail-entreprise/:id_entreprise", component: DetailEntrepriseComponent },
  { path: "ajouter-entreprise", component: AjouterEntrepriseComponent },
  { path: "modifier-entreprise/:id_entreprise", component: ModifierEntrepriseComponent },
  { path: "sorties/:id_entreprise", component: SortieComponent },
  { path: "ajouter-sortie/:id_produit", component: AjouterSortieComponent },
  { path: "ajouter-sortie", component: AjouterSortieComponent },
  { path: "utilisateur", component: UtilisateurComponent },
  { path: "ajouter-utilisateur", component: AjoutUtilisateurComponent },
  { path: "modifier-utilisateur", component: ModifierUtilisateurComponent },
  { path: "detail-utilisateur", component: DetailUtilisateurComponent },
  { path: "gerant", component: GerantComponent },
  { path: "ajouter-gerant/:id_entreprise", component: AjouterGerantComponent },
  { path: "modifier-gerant", component: ModifierGerantComponent },
  { path: "detail-gerant", component: DetailGerantComponent },
  { path: "a-propos", component: AProposComponent },
  { path: "detail-gerant/:id_agent", component: DetailGerantComponent },
  { path: "ente-jour", component: EnteteJourComponent },
  { path: "ente-mois", component: EnteteMoisComponent },
  { path: "ente-prouit", component: EnteteProduitComponent },




];
@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AccueilComponent,
    ProduitComponent,
    DetailProduitComponent,
    AjouterProduitComponent,
    ModifieProduitComponent,
    EntrepriseComponent,
    DetailEntrepriseComponent,
    AjouterEntrepriseComponent,
    ModifierEntrepriseComponent,
    UtilisateurComponent,
    AjouterUtilisateurComponent,
    ModifierUtilisateurComponent,
    DetailUtilisateurComponent,
    GerantComponent,
    AjouterGerantComponent,
    ModifierGerantComponent,
    DetailGerantComponent,
    AjoutUtilisateurComponent,
    FooterComponent,
    InscriptionComponent,
    AjouterProduitComponent,
    AProposComponent,
    EntrepriseComponent,
    ConnexionComponent,
    SortieComponent,
    AjouterSortieComponent,
    HautGaucheComponent,
    HautDroiteComponent,
    BasGaucheComponent,
    BasDroiteComponent,
    BasDroiteOptionnelComponent,
    HautDroiteOptionnelComponent,
    ListejoursComponent,
    ListemoisComponent,
    ListeproduitsComponent,
    EnteteJourComponent,
    EnteteMoisComponent,
    EnteteProduitComponent,
    SortieMoisComponent,
    AnalyticsComponent,
    EnteteAnalyticsComponent,
    ListeAnalyticsComponent,
    Body2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
