import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AjoutUtilisateurComponent } from './ajout-utilisateur/ajout-utilisateur.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './produit/produit.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AdminComponent } from './admin/admin.component';
import { AjouterProduitComponent } from './ajouter-produit/ajouter-produit.component';
import { FormsModule } from '@angular/forms';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { HttpClientModule } from '@angular/common/http';
import { ModifieProduitComponent } from './modifie-produit/modifie-produit.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { DetailEntrepriseComponent } from './detail-entreprise/detail-entreprise.component';
import { AjouterEntrepriseComponent } from './ajouter-entreprise/ajouter-entreprise.component';
import { ModifierEntrepriseComponent } from './modifier-entreprise/modifier-entreprise.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';
import { ModifierUtilisateurComponent } from './modifier-utilisateur/modifier-utilisateur.component';
import { DetailUtilisateurComponent } from './detail-utilisateur/detail-utilisateur.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { SortieComponent } from './sortie/sortie.component';
import { AjouterSortieComponent } from './ajouter-sortie/ajouter-sortie.component';
import { GerantComponent } from './gerant/gerant.component';
import { AjouterGerantComponent } from './ajouter-gerant/ajouter-gerant.component';
import { ModifierGerantComponent } from './modifier-gerant/modifier-gerant.component';
import { DetailGerantComponent } from './detail-gerant/detail-gerant.component';

const routes: Routes = [
  { path: "", component: ConnexionComponent },
  { path: "accueil", component: ConnexionComponent },
  { path: "admin", component: AdminComponent },
  { path: "ajout_utilisateur", component: AjoutUtilisateurComponent },
  { path: "produit", component: ProduitComponent },
  { path: "detail-produit", component: DetailProduitComponent },
  { path: "ajouter-produit", component: AjouterProduitComponent },
  { path: "modifier-produit", component: ModifieProduitComponent },
  { path: "modifier-produit/:id_produit", component: ModifieProduitComponent },
  { path: "entreprise", component: EntrepriseComponent },
  { path: "detail-entreprise", component: DetailEntrepriseComponent },
  { path: "ajouter-entreprise", component: AjouterEntrepriseComponent },
  { path: "modifier-entreprise", component: ModifierEntrepriseComponent },
  { path: "sorties", component: SortieComponent },
  { path: "ajouter-sortie/:id_produit", component: AjouterSortieComponent },
  { path: "ajouter-sortie", component: AjouterSortieComponent },
  { path: "utilisateur", component: UtilisateurComponent },
  { path: "ajouter-utilisateur", component: AjoutUtilisateurComponent },
  { path: "modifier-utilisateur", component: ModifierUtilisateurComponent },
  { path: "detail-utilisateur", component: DetailUtilisateurComponent },
  { path: "gerant", component: GerantComponent },
  { path: "ajouter-gerant", component: AjouterGerantComponent },
  { path: "modifier-gerant", component: ModifierGerantComponent },
  { path: "detail-gerant", component: DetailGerantComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AccueilComponent,
    AdminComponent,
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
    NavigationComponent,
    FooterComponent,
    InscriptionComponent,
    AjouterProduitComponent,
    AdminComponent,
    EntrepriseComponent,
    ConnexionComponent,
    AdminComponent,
    SortieComponent,
    AjouterSortieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
