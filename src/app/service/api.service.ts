import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url="https://gu.h24code.com/nouveau/api.php"
  host="https://gu.h24code.com/"
  // url="http://192.168.1.19/gestionuniversel_back/nouveau/api.php"
//  url="http://192.168.1.3/gestionuniversel_back/nouveau/api.php"
  ///url="http://localhost/gestionuniversel_back/nouveau/api.php"
  //  url="http://192.168.1.5/gestionuniversel_back/nouveau/api.php"
//  url="http://localhost/gestionuniversel_back/nouveau/api.php"

  global:any={
    fenetres:[],
    sidenavbool:false,
    utilisateur_connecte:{},
    fenetre_selectionnee:"fenetre_produit_sortant",
    les_fenetres:[],
    les_production_day:[],
    get_produit_day_left_list:[],
    recherche_hautgauche:"",
    les_sorties_par_jour:[],
    sortie_par_jours_par_enregistreur:[],
    les_produits_entrants:[],
    les_produits_sortants:[],
    les_categories:[],
    les_fournisseurs:[],
    les_productions:[],
    entree_par_jours_par_enregistreur:[],
    les_vendeurs:[],
    production_par_jours_par_enregistreur:[],
    consommation_par_jours_par_enregistreur:[],
    les_privileges:[],
    afficher_menu_sidenav:false,
  }
  bool:any={
    ajouterentree:false,
    ajoutersortie:false,
    ajouterproduit:false,
    modifiersortie:false,
    ajouterfournisseur:false,
    ajoutervendeur:false,
    ajouterproduction:false,
    ajouterconsommation:false,
    ajouterutilisteur:false,
    ajoutercheque:false,
    ajouterdette:false,
    ajouterdepense:false,
  }
  private subjectCode=new Subject<any>()

  constructor(private http:HttpClient,private route:Router) { }
  // pour envoyer une requete par post
  post_utilisateur_connecte(parametres:any):Observable<any>{
    let formdata=new FormData()
    for (const key in parametres) {
      formdata.append(key,parametres[key])
    }
    // on rajoute l'utilisateur
    formdata.append("utilisateur_connecte",JSON.stringify(this.global.utilisateur_connecte))
    return this.http.post(this.url,formdata)
  }
  toggleSidenav(){
    if (this.global.sidenavbool) {// sidenav ouvert, on le ferme
        // on ferme la partie gauche
        $(".gauche").removeClass("d-block");
        $(".gauche").addClass("d-none");
        // on ouvre le droite
        $(".droite").removeClass("d-none");
        $(".droite").addClass("d-block");
    } else {//fermé, on l'ouvre
        // on ferme la partie droite
        $(".droite").removeClass("d-block");
        $(".droite").addClass("d-none");
        // on ouvre le gauche
        $(".gauche").removeClass("d-none");
        $(".gauche").addClass("d-block");
    }
    this.global.sidenavbool=!this.global.sidenavbool
  }
  closeSidenav(){
      // on ferme la partie gauche
      $(".gauche").removeClass("d-block");
      $(".gauche").addClass("d-none");
      // on ouvre le droite
      $(".droite").removeClass("d-none");
      $(".droite").addClass("d-block");
      this.global.sidenavbool=false
  }
  //  ecouteur globale avec code
  sendEvent(code:string,data:any){
    this.subjectCode.next({code:code,data:data})
  }
  getEvent():Observable<any>{
    return this.subjectCode.asObservable()
  }
  closeAllBool(){
    for (const cle in this.bool) {
      this.bool[cle]=false;
    }
  }
  parse(quantite:any)
  {
    if(parseInt(quantite).toString()=='NaN'){
      return 0
    }else{
      return parseInt(quantite)
    }

  }
  navigate_fenetre(cle:string){
    this.route.navigate(['/accueil/'+this.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise+"/"+cle])
  }
}
