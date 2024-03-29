import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './page/accueil/accueil.component';
import { AjoutUtilisateurComponent } from './modal/ajout-utilisateur/ajout-utilisateur.component';
import { FooterComponent } from './page/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './page/connexion/connexion.component';
import { AjouterProduitComponent } from './modal/ajouter-produit/ajouter-produit.component';
import { FormsModule } from '@angular/forms';
import { EntrepriseComponent } from './admin/entreprise/entreprise.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailProduitComponent } from './basDroite/detail-produit/detail-produit.component';
import { DetailEntrepriseComponent } from './admin/detail-entreprise/detail-entreprise.component';
import { AjouterEntrepriseComponent } from './admin/ajouter-entreprise/ajouter-entreprise.component';
import { ModifierEntrepriseComponent } from './admin/modifier-entreprise/modifier-entreprise.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { ModifierUtilisateurComponent } from './admin/modifier-utilisateur/modifier-utilisateur.component';
import { DetailUtilisateurComponent } from './admin/detail-utilisateur/detail-utilisateur.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { SortieComponent } from './basDroite/sortie/sortie.component';
import { AjouterSortieComponent } from './modal/ajouter-sortie/ajouter-sortie.component';
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
import { SortieMoisComponent } from './basDroite/sortie-mois/sortie-mois.component';
import { AnalyticsComponent } from './basDroite/analytics/analytics.component';
import { ListeAnalyticsComponent } from './basGauche/liste-analytics/liste-analytics.component';
import { BodyComponent } from './template/body/body.component';
import { EntreeComponent } from './basDroite/entree/entree.component';
import { DashbordComponent } from './basDroite/dashbord/dashbord.component';
import { FournisseurComponent } from './basDroite/fournisseur/fournisseur.component';
import { ListeEntreeComponent } from './basGauche/liste-entree/liste-entree.component';
import { ListeFournisseurComponent } from './basGauche/liste-fournisseur/liste-fournisseur.component';
import { ListeDashbordComponent } from './basGauche/liste-dashbord/liste-dashbord.component';
import { ListeProduitEntrantComponent } from './basGauche/liste-produit-entrant/liste-produit-entrant.component';
import { AjouterEntreeComponent } from './modal/ajouter-entree/ajouter-entree.component';
import { AjouterFournisseurComponent } from './modal/ajouter-fournisseur/ajouter-fournisseur.component';
import { VendeurComponent } from './basDroite/vendeur/vendeur.component';
import { ListeVendeurComponent } from './basGauche/liste-vendeur/liste-vendeur.component';
import { AjouterVendeurComponent } from './modal/ajouter-vendeur/ajouter-vendeur.component';
import { ListeProductionComponent } from './basGauche/liste-production/liste-production.component';
import { ProductionComponent } from './basDroite/production/production.component';
import { AjouterProductionComponent } from './modal/ajouter-production/ajouter-production.component';
import { ConsommationComponent } from './basDroite/consommation/consommation.component';
import { ListeConsommationComponent } from './basGauche/liste-consommation/liste-consommation.component';
import { AjouterConsommationComponent } from './modal/ajouter-consommation/ajouter-consommation.component';
import { ListeParametreComponent } from './basGauche/liste-parametre/liste-parametre.component';
import { ParametreComponent } from './basDroite/parametre/parametre.component';
import { AnalyseComponent } from './analyse/analyse/analyse.component';
import { MesEntreprisesComponent } from './page/mes-entreprises/mes-entreprises.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './basGauche/menu/menu.component';
import { ProduitSortantComponent } from './basDroite/produit-sortant/produit-sortant.component';
import { AjoutChequeComponent } from './modal/ajout-cheque/ajout-cheque.component';
import { AjoutDetteComponent } from './modal/ajout-dette/ajout-dette.component';
import { AjouterDepenseComponent } from './modal/ajouter-depense/ajouter-depense.component';

const routes: Routes = [
  { path: "", component: ConnexionComponent },
  { path: "connexion", component: ConnexionComponent },
  { path: "accueil", component: BodyComponent },
  { path: "accueil/:id_entreprise", component: BodyComponent },
  { path: "accueil/:id_entreprise/:fenetre", component: BodyComponent },
  { path: "accueil/:id_entreprise/:fenetre/:bas_gauche_selected_item", component: BodyComponent },
  { path: "accueil/:id_entreprise/:fenetre/:bas_gauche_selected_item/:bas_droite_selected_item", component: BodyComponent },
  { path: "mes_entreprises", component: MesEntreprisesComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AccueilComponent,
    DetailProduitComponent,
    AjouterProduitComponent,
    EntrepriseComponent,
    DetailEntrepriseComponent,
    AjouterEntrepriseComponent,
    ModifierEntrepriseComponent,
    UtilisateurComponent,
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
    SortieMoisComponent,
    AnalyticsComponent,
    ListeAnalyticsComponent,
    BodyComponent,
    EntreeComponent,
    DashbordComponent,
    FournisseurComponent,
    ListeEntreeComponent,
    ListeFournisseurComponent,
    ListeDashbordComponent,
    ListeProduitEntrantComponent,
    AjouterEntreeComponent,
    AjouterFournisseurComponent,
    VendeurComponent,
    ListeVendeurComponent,
    AjouterVendeurComponent,
    ListeProductionComponent,
    ProductionComponent,
    AjouterProductionComponent,
    ConsommationComponent,
    ListeConsommationComponent,
    AjouterConsommationComponent,
    ListeParametreComponent,
    ParametreComponent,
    AnalyseComponent,
    MesEntreprisesComponent,
    MenuComponent,
    ProduitSortantComponent,
    AjoutChequeComponent,
    AjoutDetteComponent,
    AjouterDepenseComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
