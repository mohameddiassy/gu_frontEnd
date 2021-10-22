import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // url="https://gu.groupemeta.com/nouveau/api.php"
  //  url="http://192.168.1.3/gestionuniversel_back/nouveau/api.php"
  url="http://localhost/gestionuniversel_back/nouveau/api.php"
  global:any={
    fenetres:[],
    sidenavbool:false,
    utilisateur_connecte:{},
    fenetre_selectionnee:"fenetre_parametre",
    les_fenetres:[],
    recherche_hautgauche:"",
    les_sorties_par_jour:[],
    sortie_par_jours_par_enregistreur:[],
    les_produits_entrants:[],
    les_produits_sortants:[],
    les_categories:[],
    les_fournisseurs:[],
    entree_par_jours_par_enregistreur:[],
    les_vendeurs:[],
    production_par_jours_par_enregistreur:[],
    consommation_par_jours_par_enregistreur:[]
  }
  bool:any={
    ajouterentree:false,
    ajoutersortie:false,
    ajouterproduit:false,
    modifiersortie:false,
    ajouterfournisseur:false,
    ajoutervendeur:false,
    ajouterproduction:false,
    ajouterconsommation:false
  }

  private subjectCode=new Subject<any>()

  constructor(private http:HttpClient) { }
  // pour envoyer une requete par post
  post(parametres:any):Observable<any>{
    let formdata=new FormData()
    for (const key in parametres) {
      formdata.append(key,parametres[key])
    }
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
}
