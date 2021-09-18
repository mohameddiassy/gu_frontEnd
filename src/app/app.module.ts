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
import { InscriptionComponent } from './inscription/inscription.component';

const routes: Routes = [
  { path: "", component: ConnexionComponent },
  { path: "accueil", component: AccueilComponent },
  { path: "admin", component: AdminComponent },
  { path: "ajout_utilisateur", component: AjoutUtilisateurComponent },
  { path: "produit", component: ProduitComponent },
  { path: "detail-produit", component: DetailProduitComponent },
  { path: "ajouter-produit", component: AjouterProduitComponent },
  { path: "modifier-produit", component: ModifieProduitComponent },
  { path: "entreprise", component: EntrepriseComponent },
  { path: "detail-entreprise", component: DetailEntrepriseComponent },
  { path: "ajouter-entreprise", component: AjouterEntrepriseComponent },
  { path: "modifier-entreprise", component: ModifierEntrepriseComponent },
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
    AjoutUtilisateurComponent,
    NavigationComponent,
    FooterComponent,
    InscriptionComponent,
    AjouterProduitComponent,
    AdminComponent,
    EntrepriseComponent,
    ConnexionComponent,
    AdminComponent,
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
