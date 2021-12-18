import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // url="https://gu.h24code.com/nouveau/api.php"
  // url="http://192.168.1.19/gestionuniversel_back/nouveau/api.php"
//  url="http://192.168.1.3/gestionuniversel_back/nouveau/api.php"
  ///url="http://localhost/gestionuniversel_back/nouveau/api.php"
  //  url="http://192.168.1.5/gestionuniversel_back/nouveau/api.php"
 url="http://localhost/gestionuniversel_back/nouveau/api.php"

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
    selected_item:{}
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
  update_item_id(id:number){
    this.global.selected_item.item_id=id
    this.route.navigate(['/accueil/'+this.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise+"/"+this.global.fenetre_selectionnee+"/"+this.global.selected_item.item_id])
  }
  redirect_to(fenetre:string){
    var bas_gauche_selected_item= this.global.selected_item.bas_gauche_selected_item
    var bas_droite_selected_item=this.global.selected_item.bas_droite_selected_item
    if(!bas_gauche_selected_item){
      console.log("1: if(!bas_gauche_selected_item){")
      this.route.navigate(['/accueil/'+this.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise+"/"+fenetre])
    }else if(!bas_droite_selected_item){
      console.log("2: if(!bas_gauche_selected_item){")
        this.global.selected_item.bas_gauche_selected_item=bas_gauche_selected_item
        this.route.navigate(['/accueil/'+this.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise+"/"+fenetre+"/"+bas_gauche_selected_item])
    }else{
      console.log("3: else")
      this.route.navigate(['/accueil/'+this.global.utilisateur_connecte.entreprise_selectionnee.id_entreprise+"/"+fenetre+"/"+bas_gauche_selected_item+"/"+bas_droite_selected_item])
    }
    
  }
  get_selected_item_by_id(array:any,nom_id:string,selected_item_id:number){
    if(array.length==0){
      console.log("Le tableau est vide")
      return null
    }else if(!selected_item_id){
      console.log("Pas d'item_id dans l'url, on selectionne le premier")
      return array[0]
    }
    var rep=null
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if(parseInt(element[nom_id])==selected_item_id){
        rep= element
        console.log("Il existe éffectivement un item ",rep)
        break;
      }
    }
    if(rep==null){
      console.log("Pas d'item d'"+nom_id+" = "+selected_item_id)
    }
    
    return rep
  }
  get_selected_item_by_date(array:any,nom_date:string,selected_item_date:string){
    var rep=null
    if(array.length==0){
      console.log("La liste des jour est vide")
    }else if(!selected_item_date){
      console.log("Pas de date dans l'url, on selectionne le premier")
      rep= array[0]
    }else{
      for (let i = 0; i < array.length; i++) {
          const element = array[i];
          if(moment(element[nom_date]).format("YYYY-MM-DD")==moment(selected_item_date).format("YYYY-MM-DD")){
            rep=element
            break;
          }
        }
        if(rep==null){
          console.log("Pas de date ",selected_item_date," dans ",array)
        }
    }
    return rep
  }
}
