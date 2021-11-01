import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-liste-dashbord',
  templateUrl: './liste-dashbord.component.html',
  styleUrls: ['./liste-dashbord.component.css']
})
export class ListeDashbordComponent implements OnInit {
  icons:any={
    "fenetre_dashbord":{icone:"list",background_color:"#63c2de",color:"white"},
    "fenetre_sortie":{icone:"paper-plane",background_color:"#63c2de",color:"white"},
    "fenetre_entree":{icone:"baby-carriage",background_color:"#63c2de",color:"white"},
    "fenetre_production":{icone:"brain",background_color:"#63c2de",color:"white"},
    "fenetre_consommation":{icone:"battery-half",background_color:"#63c2de",color:"white"},
    "fenetre_produit":{icone:"blackberry",background_color:"#63c2de",color:"white"},
    "fenetre_produit_sortant":{icone:"caret-right",background_color:"#63c2de",color:"white"},
    "fenetre_produit_entrant":{icone:"caret-left",background_color:"#63c2de",color:"white"},
    "fenetre_vendeur":{icone:"american-sign-language-interpreting",background_color:"#63c2de",color:"white"},
    "fenetre_parametre":{icone:"cogs",background_color:"#63c2de",color:"white"},
    "fenetre_fournisseur":{icone:"charging-station",background_color:"#63c2de",color:"white"},
  }
  constructor(public api:ApiService,private route:Router) { }

  ngOnInit(): void {
  }
  clique(item:any) {
    // console.log("jh jghhjohklk ",item)
    this.api.global.afficher_menu_sidenav=!this.api.global.afficher_menu_sidenav
    this.route.navigate(['/accueil/'+this.api.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise+"/"+item.cle])
  }

}
