import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // url="https://gu.groupemeta.com/"
  // url="http://192.168.1.8/gestionuniversel_back/"
  url="http://localhost/gestionuniversel_back/"
  les_produits:any[]=[]
  les_sorties:any[]=[]
  utilisateur_connecte:any
  les_entreprises:any[]=[]
  les_agents: any;
  hautdroite:any={}
  private subject=new Subject<any>()
  private subjectclose=new Subject<any>()
  listehautgauche=[
    {nom:"Sorties",id:1},
    {nom:"Produits",id:2},
    {nom:"Achats",id:3},
    {nom:"Fournisseurs",id:4},
    {nom:"Semaines",id:5},
    {nom:"Mois",id:6},
    {nom:"Années",id:7},
    {nom:"Toutes Périodes",id:8},
    {nom:"Jours",id:8},
  ]
  listeproduits=[
    {nom:"Pain",id:1},
    {nom:"Farine",id:2},
    {nom:"Sel",id:3},
    {nom:"Levure",id:4},
  ]
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
  sendClick(item:any){
    this.subject.next(item)
  }
  getClick():Observable<any>{
    return this.subject.asObservable()
  }
  sendCloseClick(){
    this.subjectclose.next()
  }
  getCloseClick():Observable<any>{
    return this.subjectclose.asObservable()
  }
}
