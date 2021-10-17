import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  // url="https://gu.groupemeta.com/"
  // url="http://192.168.1.6/gestionuniversel_back/"
  url="http://localhost/gestionuniversel_back/nouveau/api.php"
  global:any={
    fenetres:[],
    sidenavbool:false,
    utilisateur_connecte:{},
    fenetre_selectionnee:0,
    les_fenetres:[],
    recherche_hautgauche:"",
    les_sorties_par_jour:[],
    sortie_par_jours_par_enregistreur:[]
  }
  bool:any={
    ajoutersortie:false,
    ajouterproduit:false,
    modifiersortie:false
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
}
