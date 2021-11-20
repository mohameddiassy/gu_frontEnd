import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // url="https://gu.groupemeta.com/nouveau/api.php"
//url="http://192.168.1.4/gestionuniversel_back/nouveau/api.php"
 url="http://localhost/gestionuniversel_back/nouveau/api.php"
  global:any={
    fenetres:[],
    sidenavbool:false,
    utilisateur_connecte:{},
    fenetre_selectionnee:"fenetre_dashbord",
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
    afficher_menu_sidenav:false
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
    ajouterutilisteur:false
  }

  private subjectCode=new Subject<any>()

  constructor(private http:HttpClient) { }
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
  get_categorie(){
    let api_path:string=""
    let api_url=api_path+"/categorie/get" // recevoir tout
    //let api_url=this.api_path+"/categorie/get?id_categorie=1" // recevoir le(a) categorie d'identifiant 1

    this.http.get(api_url).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table categorie. Réponse= ",reponse)
      }else{
        console.log("L'opération sur la table categorie a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
    })
  }
  add_categorie(categorie:any){
    /*
    categorie:any={
      id_categorie:1,
    }
    */
    //transformation des parametres à envoyer
    let formdata=new FormData()
    for (const key in categorie) {
      formdata.append(key,categorie[key])
    }

    let api_url="/add" 
    this.http.post(api_url,formdata).subscribe((reponse:any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table categorie. Réponse= ",reponse)
      }else{
        console.log("L'opération sur la table categorie a échoué. Réponse= ",reponse)
      }
    },
    (error:any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
    })
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
