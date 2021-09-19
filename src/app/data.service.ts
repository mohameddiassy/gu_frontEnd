import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // url="https://gu.groupemeta.com/"
  url="http://192.168.1.8/gestionuniversel_back/"
  les_produits:any[]=[]
  les_sorties:any[]=[]
  utilisateur_connecte:any
  les_entreprises:any[]=[]
  les_agents: any;
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
}
