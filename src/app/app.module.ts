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
import { AProposComponent } from './a-propos/a-propos.component';

const routes: Routes = [
  {path:"",component:AccueilComponent},
  {path:"accueil",component:AccueilComponent},
  {path:"ajout_utilisateur",component:AjoutUtilisateurComponent},
  {path:"inscription",component:InscriptionComponent},
  {path:"ajouter_produit",component:AjouterProduitComponent},
  {path:"a-propos",component:AProposComponent}
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
    AProposComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
