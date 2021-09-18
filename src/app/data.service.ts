import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url="http://192.168.1.8/gestionuniversel_back/"
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
}
