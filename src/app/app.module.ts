import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AjoutUtilisateurComponent } from './ajout-utilisateur/ajout-utilisateur.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { AjouterProduitComponent } from './ajouter-produit/ajouter-produit.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path:"",component:AccueilComponent},
  {path:"accueil",component:AccueilComponent},
  {path:"ajout_utilisateur",component:AjoutUtilisateurComponent},
  {path:"inscription",component:InscriptionComponent},
  {path:"admin",component:AdminComponent},
  {path:"ajouter_produit",component:AjouterProduitComponent},
  {path:"entreprise",component:EntrepriseComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AjoutUtilisateurComponent,
    NavigationComponent,
    FooterComponent,
    InscriptionComponent,
    AjouterProduitComponent,
    AdminComponent,
    EntrepriseComponent
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
