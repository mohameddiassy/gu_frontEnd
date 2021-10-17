import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // url="https://gu.groupemeta.com/"
  // url="http://192.168.1.6/gestionuniversel_back/"
  url="http://localhost/gestionuniversel_back/"
  les_produits:any[]=[]
  les_sorties:any[]=[]
  utilisateur_connecte:any
  les_entreprises:any[]=[]
  les_agents: any;
  hautdroite:any={}
  private subject=new Subject<any>()
  private subjectclose=new Subject<any>()
  private subjectenvoyer=new Subject<any>()
  private subjectProduit=new Subject<any>()
  private subjectEvent=new Subject<any>()
  private subjectCode=new Subject<any>()
  listehautgauche=[
    {nom:"Jours",id:0,component:'ListejoursComponent'},
    {nom:"Mois",id:1,component:'ListemoisComponent'},
    {nom:"Produits",id:2,component:'ProduitComponent'},
   // {nom:"Achats",id:3},
   // {nom:"Fournisseurs",id:4},
    // {nom:"Semaines",id:5},
    // {nom:"Années",id:7},
    // {nom:"Toutes Périodes",id:8},
    // {nom:"Sorties",id:9,component:'SortieComponent'},
  ]
  listeproduits=[
    {nom:"Pain",id:1},
    {nom:"Farine",id:2},
    {nom:"Sel",id:3},
    {nom:"Levure",id:4},
  ]
  recherche_hautgauche=""
  option='0'
  les_jours:any[]=[]
  les_mois:any[]=[]
  les_sorties_mois: any;
  bool:any={
    ajoutersortie:false,
    ajouterproduit:false,
    modifiersortie:false
  }
  sidenavbool=true
  constructor(private http:HttpClient) { }
  // requete_post("inscription.php",{prenom:"mouhamed",nom:"Amar"},(data:any)=>{//apres reception})
  requete_post(page:string,parametres:any,calback:Function){
    let formdata=new FormData()
    for (const key in parametres) {
      formdata.append(key,parametres[key])
    }
    this.http.post(this.url+page,formdata).subscribe((data:any)=>{
      console.log("reponse= ",data)
      calback(data)
    })
  }
  chargement_image(event:any,page:string,parametres:any,calback:Function){
    let formdata = new FormData();
    for (const key in parametres) {
      formdata.append(key,parametres[key])
    }
    if (event) {
      const fileList: FileList = event.target.files;
      //check whether file is selected or not
      if (fileList.length > 0) {
          for (let i = 0; i < fileList.length; i++) {
            formdata.append('file[]', fileList[i]);
          }
      }else{
        console.log("Pas d'image sélectionnée")
      }
    }
    console.log("formdata= ",formdata)
    this.http.post(this.url+page,formdata).subscribe((data:any)=>{
      console.log("reponse= ",data)
      calback(data)
    })
  }
  sendBasGaucheClick(item:any){
    this.subject.next(item)
  }
  getBasGaucheClick():Observable<any>{
    return this.subject.asObservable()
  }
  sendCloseClick(){
    this.subjectclose.next()
  }
  getCloseClick():Observable<any>{
    return this.subjectclose.asObservable()
  }
  recevoir_sorties(date:string){
    this.requete_post("get_sortie_by_id_date.php",{id_utilisateur:1,date:date},(data:any)=>{
      this.les_sorties=data
    })
  }
  recevoir_sortiesMois(date:string){
    this.requete_post("get_sortie_by_id_date2.php",{id_utilisateur:1,date:date},(data:any)=>{
      this.les_sorties_mois=data
    })
  }
  envoyerClick(){
    this.subjectenvoyer.next()
  }
  recevoirClick():Observable<any>{
    return this.subjectenvoyer.asObservable()
  }

  //notif
  sendproduit(item:any){
    this.subjectProduit.next(item)
  }
  getProduit():Observable<any>{
    return this.subjectProduit.asObservable()
  }
  // ecouteur globale
  sendEvent(index:number,item:any){
    this.subjectEvent.next({item:item,index:index})
  }
  getEvent():Observable<any>{
    return this.subjectEvent.asObservable()
  }

  recevoir_jours(callback:Function){
    this.requete_post("get_nombre_d_activite_jour.php",{id_utilisateur:1},(data:any)=>{

      this.les_jours=data
      console.log(this.les_jours[0].date+"     "+moment().format("YYYY-MM-DD"))
      if (this.les_jours.length>0 && this.les_jours[0].date==moment().format("YYYY-MM-DD")) {
        // on a deja un enregistrement pour aujourd'hui
      } else {
        this.les_jours.unshift({
            "date": moment().format("YYYY-MM-DD"),
            "nombre": "0",
            "montant": "0"
        })
      }
      callback(this.les_jours)
    })
  }
  recevoir_mois(callback:Function){
    this.requete_post("get_nombre_d_activite_mois.php",{id_utilisateur:1},(data:any)=>{
      this.les_mois=data
      callback(this.les_jours)
    })
  }
  recevoir_produit_entreprise(id_entreprise:number,callback:Function){
    this.requete_post("get_product_by_entreprise.php",{id_entreprise:id_entreprise},(data:any)=>{
      this.les_produits=data
      callback(data)
    })
  }

  closeAllBool(){
    for (const cle in this.bool) {
      this.bool[cle]=false;
    }
  }
  // ecouteur globale avec code
  sendCode(code:string,data:any){
    this.subjectCode.next({code:code,data:data})
  }
  getCode():Observable<any>{
    return this.subjectCode.asObservable()
  }
  
  toggleSidenav(){
    if (this.sidenavbool) {// sidenav ouvert, on le ferme
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
    this.sidenavbool=!this.sidenavbool
  }
  
  closeSidenav(){
      // on ferme la partie gauche
      $(".gauche").removeClass("d-block");
      $(".gauche").addClass("d-none");
      // on ouvre le droite
      $(".droite").removeClass("d-none");
      $(".droite").addClass("d-block");
      this.sidenavbool=false
  }
}
